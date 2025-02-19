import psycopg2
from ..database import get_db_connection

# Create an event (using raw SQL)
def create_event(event_type: str, date, location: str = None, description: str = None, associated_person_id: int = None, associated_family_id: int = None):
    query = """
    INSERT INTO Event (EventType, Date, Location, Description, AssociatedPersonID, AssociatedFamilyID)
    VALUES (%s, %s, %s, %s, %s, %s);
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (event_type, date, location, description, associated_person_id, associated_family_id))
            conn.commit()

# Get a single event by ID (returns custom dictionary)
def get_event_by_id(event_id: int):
    query = """
    SELECT * FROM Event WHERE EventID = %s;
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (event_id,))
            result = cursor.fetchone()
    
    # Custom dictionary for event
    if result:
        event_dict = {
            "id": result[0],  # EventID
            "type": result[1],  # EventType
            "date": result[2],  # Date
            "location": result[3],  # Location
            "description": result[4],  # Description
            "associated_person_id": result[5],  # AssociatedPersonID
            "associated_family_id": result[6]  # AssociatedFamilyID
        }
    else:
        event_dict = {}
    
    return event_dict

# Get all events (returns custom dictionary list)
def get_all_events():
    query = """
    SELECT * FROM Event;
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
    
    # Custom dictionary for each event
    events = []
    for row in result:
        event_dict = {
            "id": row[0],  # EventID
            "type": row[1],  # EventType
            "date": row[2],  # Date
            "location": row[3],  # Location
            "description": row[4],  # Description
            "associated_person_id": row[5],  # AssociatedPersonID
            "associated_family_id": row[6]  # AssociatedFamilyID
        }
        events.append(event_dict)
    
    return events
