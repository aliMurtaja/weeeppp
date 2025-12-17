// Pure front-end mock data used by the repository via httpClient.
// This lets us keep the same services pattern without needing a real backend.

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

const LARGE_APPOINTMENT_ROWS = generateAppointments(5000);

export function getOverviewMock() {
  return {
    date: new Date().toISOString(),
    metrics: [
      { id: 'checkedIn', label: 'checked in', value: 120 },
      { id: 'waitingForTechnician', label: 'waiting for Technician', value: 45 },
      { id: 'readyForDoctor', label: 'ready for Doctor', value: 30 },
      { id: 'completed', label: 'completed', value: 310 },
      { id: 'cancelled', label: 'cancelled', value: 12 },
    ],
  };
}

export function getAppointmentsMock(size = 1000) {
  const safeSize = Math.max(
    0,
    Math.min(Number.isNaN(size) ? 1000 : size, LARGE_APPOINTMENT_ROWS.length),
  );

  return {
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
    rows: LARGE_APPOINTMENT_ROWS.slice(0, safeSize),
  };
}

export function getDrFirstMock() {
  return {
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
  };
}

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

export function getReadyForDoctorMock() {
  return {
    rows: READY_FOR_DOCTOR_ROWS,
  };
}


