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
        
        # Return success status with the inserted data
        return {
            "status": 200,
            "data": {
                "eventtype": eventtype,
                "date": date,
                "location": location,
                "description": description,
                "associatedpersonid": associatedpersonid,
                "associatedfamilyid": associatedfamilyid
            }
        }
        # Return error status with the error message
    
    except Exception as e:
        # Return error status with the error message
        return {"status": 500, "message": str(e)}

# Get a single event by ID (returns custom dictionary)
def get_event_by_id(event_id: int):
    try:
        query = """
        SELECT * FROM Event WHERE EventID = %s;
        """
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (event_id,))
                result = cursor.fetchone()
        
        # Convert tuple result to dictionary
        if result:
            event_dict = {
                "id": result[0],  # EventID
                "type": result[1],  # EventType
                "date": result[2],  # Date
                "location": result[3],  # Location
                "description": result[4],  # Description
                "associated_person_id": result[5],  # AssociatedPersonID
                "associated_family_id": result[6],  # AssociatedFamilyID
                }
            return {"status": 200, "data": event_dict}  # Success response
        else:
            return {"status": 404, "data": {}}  # Not found
    
    except Exception as e:
        # Return error status with the error message
        return {"status": 500, "message": str(e)}

# Get all events (returns custom dictionary list)
def get_all_events():
    try:
        query = """
        SELECT * FROM Event;
        """
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
        
        # Convert list of tuples to list of dictionaries
        events = []
        for row in result:
            

            event_dict = {
                "id": row[0],  # EventID
                "type": row[1],  # EventType
                "date": row[2],  # Date
                "location": row[3],  # Location
                "description": row[4],  # Description
                "associated_person_id": row[5],  # AssociatedPersonID
                "associated_family_id": row[6],  # AssociatedFamilyID
                
            }
            events.append(event_dict)
        
        return {"status": 200, "data": events}  # Success response with all events
    
    except Exception as e:
        # Return error status with the error message
        return {"status": 500, "message": str(e)}
