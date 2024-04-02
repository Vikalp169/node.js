const fs = require('fs');
const chalk = require('chalk');

const addBooking = function(name, time) {
    const bookings = loadBookings();
    const duplicateBooking = bookings.find(booking => booking.name === name);

    if (!duplicateBooking) {
        bookings.push({
            name: name,
            time: time
        });
        saveBookings(bookings);
        console.log('New booking added!');
    } else {
        console.log('Booking for this customer already exists!');
    }
};

const removeBooking = function(name) {
    const bookings = loadBookings();
    const updatedBookings = bookings.filter(booking => booking.name !== name);

    if (bookings.length > updatedBookings.length) {
        console.log(chalk.green.inverse('Booking removed!'));
        saveBookings(updatedBookings);
    } else {
        console.log('No booking found for this customer!');
    }
};

const listBookings = function() {
    const bookings = loadBookings();

    console.log(chalk.inverse('All bookings:'));
    bookings.forEach(booking => {
        console.log(`Customer: ${booking.name}, Time: ${booking.time}`);
    });
};

const readBooking = function(name) {
    const bookings = loadBookings();
    const booking = bookings.find(booking => booking.name === name);

    if (booking) {
        console.log(chalk.inverse(`Booking for ${booking.name}:`));
        console.log(`Time: ${booking.time}`);
    } else {
        console.log(chalk.red.inverse('Booking not found!'));
    }
};

const saveBookings = function(bookings) {
    const dataJSON = JSON.stringify(bookings, null, 2);
    fs.writeFileSync('bookings.json', dataJSON);
};

const loadBookings = function() {
    try {
        const dataBuffer = fs.readFileSync('bookings.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

module.exports = {
    addBooking: addBooking,
    removeBooking: removeBooking,
    listBookings: listBookings,
    readBooking: readBooking
};
