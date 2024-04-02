const yargs = require('yargs');
const booking = require('./booking');

// Create add Command
yargs.command({
    command: 'add',
    describe: 'Add a new booking',
    builder: {
        name: {
            describe: 'Customer name',
            demandOption: true,
            type: 'string'
        },
        time: {
            describe: 'Booking time',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        booking.addBooking(argv.name, argv.time);
    }
});

// Create remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a booking',
    builder: {
        name: {
            describe: 'Customer name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        booking.removeBooking(argv.name);
    }
});

// Create list Command
yargs.command({
    command: 'list',
    describe: 'List all bookings',
    handler() {
        booking.listBookings();
    }
});

// Create read Command (for a specific booking)
yargs.command({
    command: 'read',
    describe: 'Read a booking',
    builder: {
        name: {
            describe: 'Customer name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        booking.readBooking(argv.name);
    }
});

yargs.parse();

