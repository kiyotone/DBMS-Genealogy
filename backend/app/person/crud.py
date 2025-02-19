from ..database import get_db_connection

# Create a person (with or without personid)
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

# Get a person by ID (returns a custom dictionary)
def get_person_by_id(person_id: int):
    query = """
    SELECT * FROM Person WHERE PersonID = %s;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (person_id,))
            result = cursor.fetchone()

    # Custom dictionary for person
    if result:
        person_dict = {
            "id": result[0],  # PersonID
            "firstname": result[1],  # FirstName
            "lastname": result[2],  # LastName
            "gender": result[3],  # Gender
            "dateofbirth": result[4],  # DateOfBirth
            "dateofdeath": result[5],  # DateOfDeath
            "maternalfamilyid": result[6],  # MaternalFamilyID
            "paternalfamilyid": result[7]  # PaternalFamilyID
        }
    else:
        person_dict = {}
    
    return person_dict

# Get all persons (returns a list of custom dictionaries)
def get_all_persons():
    query = """
    SELECT * FROM Person;
    """
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()

    # Custom dictionary for each person
    persons = []
    for row in result:
        person_dict = {
            "id": row[0],  # PersonID
            "firstname": row[1],  # FirstName
            "lastname": row[2],  # LastName
            "gender": row[3],  # Gender
            "dateofbirth": row[4],  # DateOfBirth
            "dateofdeath": row[5],  # DateOfDeath
            "maternalfamilyid": row[6],  # MaternalFamilyID
            "paternalfamilyid": row[7]  # PaternalFamilyID
        }
        persons.append(person_dict)

    return persons
