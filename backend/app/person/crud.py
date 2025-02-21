from ..database import get_db_connection

# Create a person (with or without personid)
def create_person(firstname: str = None, lastname: str = None, gender: str = None, 
                  dateofbirth: str = None, dateofdeath: str = None, maternalfamilyid: int = None, 
                  paternalfamilyid: int = None, occupation: str = None):
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            
            # Get the next available PersonID by selecting the max and incrementing by 1
            cursor.execute("SELECT MAX(PersonID) FROM Person;")
            result = cursor.fetchone()
            
            if result[0] is None:
                personId = 1  # If no data, start from 1
            else:
                personId = result[0] + 1  # Increment the max ID
            
            # Insert the new person with the generated personId
            query = """
            INSERT INTO Person (PersonID, FirstName, LastName, Gender, DateOfBirth, DateOfDeath, MaternalFamilyID, PaternalFamilyID, Occupation)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
            """
            
            # Pass None for MaternalFamilyID and PaternalFamilyID if they are not provided
            cursor.execute(query, (personId, firstname, lastname, gender, dateofbirth, dateofdeath, 
                                   maternalfamilyid if maternalfamilyid is not None else None,
                                   paternalfamilyid if paternalfamilyid is not None else None,
                                   occupation))
            
            # Commit the transaction
            conn.commit()
    
    return personId  # Return the generated personId


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
            "paternalfamilyid": result[7] ,  # PaternalFamilyID
            "occupation": result[8]  # Occupation
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
            "paternalfamilyid": row[7],  # PaternalFamilyID
            "occupation": row[8]  # Occupation
        }
        persons.append(person_dict)

    return persons
