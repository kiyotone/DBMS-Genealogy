from ..database import get_db_connection

def create_person(personid: int = None, firstname: str = None, lastname: str = None, gender: str = None, 
                  dateofbirth: str = None, dateofdeath: str = None, maternalfamilyid: int = None, 
                  paternalfamilyid: int = None):
    
    print(f"Creating person with ID: {personid}")
    
    if personid is not None:
        # Use the given ID in the insert query
        query = """
        INSERT INTO Person (PersonID, FirstName, LastName, Gender, DateOfBirth, DateOfDeath, MaternalFamilyID, PaternalFamilyID)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (personid, firstname, lastname, gender, dateofbirth, dateofdeath, 
                                       maternalfamilyid, paternalfamilyid))
                conn.commit()
    else:
        # Let the database generate the ID automatically
        query = """
        INSERT INTO Person (FirstName, LastName, Gender, DateOfBirth, DateOfDeath, MaternalFamilyID, PaternalFamilyID)
        VALUES (%s, %s, %s, %s, %s, %s, %s);
        """
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (firstname, lastname, gender, dateofbirth, dateofdeath, 
                                       maternalfamilyid, paternalfamilyid))
                conn.commit()

# Get a person by ID
def get_person_by_id(person_id: int):
    query = """
    SELECT * FROM Person WHERE PersonID = %s;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (person_id,))
            result = cursor.fetchone()

    return result

# Get all persons
def get_all_persons():
    query = """
    SELECT * FROM Person;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()

    return result
