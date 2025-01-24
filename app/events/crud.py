import psycopg2
from ..database import get_db_connection

def create_event(event_type: str, date, location: str = None, description: str = None, associated_person_id: int = None, associated_family_id: int = None):
    query = """
    INSERT INTO Event (EventType, Date, Location, Description, AssociatedPersonID, AssociatedFamilyID)
    VALUES (%s, %s, %s, %s, %s, %s);
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (event_type, date, location, description, associated_person_id, associated_family_id))
            conn.commit()

def get_event_by_id(event_id: int):
    query = """
    SELECT * FROM Event WHERE EventID = %s;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (event_id,))
            return cursor.fetchone()

def get_all_events():
    query = """
    SELECT * FROM Event;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            return cursor.fetchall()
