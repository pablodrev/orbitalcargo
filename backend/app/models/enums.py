import enum

class StatusEnum(str, enum.Enum):
    PENDING = "Pending"
    IN_PROGRESS = "In Progress"
    DELIVERED = "Delivered"
    CANCELLED = "Cancelled"

class DirectionEnum(str, enum.Enum):
    TO_ORBIT = "To Orbit"
    TO_EARTH = "To Earth"

class SizeEnum(str, enum.Enum):
    SMALL = "Small"
    MEDIUM = "Medium"
    LARGE = "Large"

class PositionEnum(str, enum.Enum):
    EARTH = "Earth"
    ORBIT = "Orbit"

class DoorStatesEnum(str, enum.Enum):
    OPEN = "Open"
    CLOSED = "Closed"
    AJAR = "Ajar"

# class MissionStates(str, enum.Enum):
#     SCHEDULED = 'Scheduled'
#     IN_FLIGHT = 'In_flight'
#     COMPLETED = 'Completed'
#     CANCELLED = 'Cancelled'

# class PhasesEnum(str, enum.Enum):
#     IDLE = 'Idle'
#     ASCENT = 'Ascent'
#     ORBIT = 'Orbit'
#     DESCENT = 'Descent'
#     LANDING = 'Landing'