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
