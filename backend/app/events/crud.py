from ..database import get_db_connection

# Create an event (using raw SQL)
def create_event(eventtype: str, date, location: str = None, description: str = None, associatedpersonid: int = None, associatedfamilyid: int = None):
    try:
        query = """
        INSERT INTO Event (EventType, Date, Location, Description, AssociatedPersonID, AssociatedFamilyID)
        VALUES (%s, %s, %s, %s, %s, %s);
        """
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (eventtype, date, location, description, associatedpersonid, associatedfamilyid))
                conn.commit()
        
        return {
            "status": 200,
            "data": {
                "associated_person_id": associatedpersonid,
                "associated_family_id": associatedfamilyid
            }
        }
    
    except Exception as e:
        return {"status": 500, "message": str(e)}

# Get a single event by ID
def get_event_by_id(event_id: int):
    try:
        query = """
        SELECT EventID, AssociatedPersonID, AssociatedFamilyID
        FROM Event WHERE EventID = %s;
        """
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (event_id,))
                result = cursor.fetchone()
        
        if result:
            event_dict = {
                "id": result[0],
                "associated_person_id": result[1],
                "associated_family_id": result[2]
            }
            return {"status": 200, "data": event_dict}
        else:
            return {"status": 404, "data": {}}
    
    except Exception as e:
        return {"status": 500, "message": str(e)}

# Get all events
def get_all_events():
    try:
        query = """
        SELECT EventID, AssociatedPersonID, AssociatedFamilyID FROM Event;
        """
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
        
        events = [
            {
                "id": row[0],
                "associated_person_id": row[1],
                "associated_family_id": row[2]
            }
            for row in result
        ]
        
        return {"status": 200, "data": events}
    
    except Exception as e:
        return {"status": 500, "message": str(e)}