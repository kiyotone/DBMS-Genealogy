from ..database import get_db_connection

# Create a new person
def create_person(first_name: str, last_name: str, gender: str, date_of_birth: str, date_of_death: str = None,
                  maternal_family_id: int = None, paternal_family_id: int = None):
    query = """
    INSERT INTO Person (FirstName, LastName, Gender, DateOfBirth, DateOfDeath, MaternalFamilyID, PaternalFamilyID)
    VALUES (%s, %s, %s, %s, %s, %s, %s);
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (first_name, last_name, gender, date_of_birth, date_of_death, 
                                   maternal_family_id, paternal_family_id))
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
