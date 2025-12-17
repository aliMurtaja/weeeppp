const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(compression());

// ---- In-memory heavy dummy data for performance testing ----

const APPOINTMENT_TYPES = [
  'Comprehensive Exam',
  'Follow-up',
  'Post-op',
  'Consultation',
  'Emergency',
];

const PROVIDERS = ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee', 'Dr. Patel', 'Dr. Chen'];

const PATIENT_FIRST_NAMES = [
  'John',
  'Jane',
  'Alex',
  'Emily',
  'Michael',
  'Sarah',
  'David',
  'Laura',
  'Daniel',
  'Sophia',
];

const PATIENT_LAST_NAMES = [
  'Brown',
  'Johnson',
  'Williams',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
];

function generateAppointments(count) {
  const rows = [];
  const startHour = 8;

  for (let i = 0; i < count; i += 1) {
    const hour = startHour + Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const timeLabel = `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;

    const firstName = PATIENT_FIRST_NAMES[i % PATIENT_FIRST_NAMES.length];
    const lastName = PATIENT_LAST_NAMES[i % PATIENT_LAST_NAMES.length];

    rows.push({
      id: i + 1,
      time: timeLabel,
      patient: `${firstName} ${lastName}`,
      type: APPOINTMENT_TYPES[i % APPOINTMENT_TYPES.length],
      provider: PROVIDERS[i % PROVIDERS.length],
      notes: i % 5 === 0 ? 'Follow-up on previous visit' : '',
    });
  }

  return rows;
}

// Pre-generate a large dataset once so the frontend can test scalability.
const LARGE_APPOINTMENT_ROWS = generateAppointments(5000);

function generateReadyForDoctor(count) {
  const rows = [];

  for (let i = 0; i < count; i += 1) {
    const baseAppointment = LARGE_APPOINTMENT_ROWS[i];
    const roomNumber = 1 + (i % 10);

    rows.push({
      id: i + 1,
      patient: baseAppointment.patient,
      room: `Room ${roomNumber}`,
      provider: baseAppointment.provider,
    });
  }

  return rows;
}

const READY_FOR_DOCTOR_ROWS = generateReadyForDoctor(5);

// Dummy practice-at-a-glance metrics
app.get('/api/dashboard/overview', (_req, res) => {
  res.json({
    date: new Date().toISOString(),
    metrics: [
      { id: 'checkedIn', label: 'checked in', value: 120 },
      { id: 'waitingForTechnician', label: 'waiting for Technician', value: 45 },
      { id: 'readyForDoctor', label: 'ready for Doctor', value: 30 },
      { id: 'completed', label: 'completed', value: 310 },
      { id: 'cancelled', label: 'cancelled', value: 12 },
    ],
  });
});

// Dummy appointments data with a large number of rows
app.get('/api/dashboard/appointments', (req, res) => {
  const sizeParam = parseInt(req.query.size, 10);
  const size = Number.isNaN(sizeParam) ? 1000 : Math.max(0, Math.min(sizeParam, LARGE_APPOINTMENT_ROWS.length));

  res.json({
    date: new Date().toISOString(),
    tabs: [
      'Checked In',
      'Waiting for Technician',
      'In Progress',
      'Completed',
      'Incomplete (RXS)',
      'Cancelled',
      'No Show',
      'ASPSA',
    ],
    rows: LARGE_APPOINTMENT_ROWS.slice(0, size),
  });
});

// Dummy DrFirst refill/action widget data
app.get('/api/dashboard/drfirst', (_req, res) => {
  res.json({
    sections: [
      {
        id: 'pharmacyMessages',
        title: 'Pharmacy Messages',
        items: [
          { id: 'refillRequests', label: 'Refill Requests', value: 235 },
          { id: 'rxChange', label: 'Rx Change', value: 48 },
        ],
      },
      {
        id: 'prescriptionSummary',
        title: 'Prescription Summary',
        items: [
          { id: 'pendingRxs', label: 'Pending Rxs', value: 189 },
          { id: 'unsignedRxs', label: 'Unsigned Rxs', value: 76 },
        ],
      },
    ],
  });
});

// Ready for Doctor queue (small table from the screenshot)
app.get('/api/dashboard/ready-for-doctor', (_req, res) => {
  res.json({
    rows: READY_FOR_DOCTOR_ROWS,
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});


