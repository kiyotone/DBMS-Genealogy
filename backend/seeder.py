import json
import psycopg2
from app.database import get_db_connection  # Assuming this is where your DB connection is

def truncate_table(table_name):
    """Truncate the table to remove all existing data."""
    query = f"TRUNCATE TABLE {table_name} RESTART IDENTITY CASCADE;"
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            conn.commit()
    print(f"Table {table_name} truncated.")

def seed_data_from_json(table_name, json_file):
    # Truncate the table first to remove previous data
    truncate_table(table_name)

    # Load the data from the JSON file
    with open(json_file, "r") as f:
        data = json.load(f)

    # Establish database connection
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            for row in data:
                # Build the query and data for each row
                if table_name == "Family":
                    query = """
                    INSERT INTO Family (FamilyName, OriginCountry, Description)
                    VALUES (%s, %s, %s);
                    """
                    values = (row.get("familyname"), row.get("origincountry"), row.get("description"))
                elif table_name == "Person":
                    query = """
                    INSERT INTO Person (FirstName, LastName, Gender, DateOfBirth, DateOfDeath, MaternalFamilyID, PaternalFamilyID , Occupation)
                    VALUES (%s, %s, %s, %s, %s, %s, %s , %s);
                    """
                    values = (row.get("firstname"), row.get("lastname"), row.get("gender"),
                              row.get("dateofbirth"), row.get("dateofdeath"),
                              row.get("maternalfamilyid"), row.get("paternalfamilyid") , row.get("occupation"))
                elif table_name == "Event":
                    query = """
                    INSERT INTO Event (EventType, Date, Location, Description, AssociatedPersonID, AssociatedFamilyID)
                    VALUES (%s, %s, %s, %s, %s, %s);
                    """
                    values = (row.get("eventtype"), row.get("date"), row.get("location"),
                              row.get("description"), row.get("associatedpersonid"), row.get("associatedfamilyid"))
                elif table_name == "Relationship":
                    query = """
                    INSERT INTO Relationship (Person1ID, Person2ID, RelationshipType, Status)
                    VALUES (%s, %s, %s, %s);
                    """
                    values = (row.get("person1id"), row.get("person2id"),
                              row.get("relationshiptype"), row.get("status"))
                
                elif table_name == "Users":
                    query = """
                    INSERT INTO Users (FirstName, LastName, Username, Password, Email, Role)
                    VALUES (%s, %s, %s, %s , %s, %s);
                    """
                    values = (row.get("firstname"), row.get("lastname"), row.get("username"),
                              row.get("password"), row.get("email"), row.get("role"))
                
                else:
                    print(f"Unknown table: {table_name}")
                    return

                # Execute the query
                cursor.execute(query, values)
            conn.commit()

    print(f"Data seeded successfully into {table_name}.")

def seed_all_data():
    # Define the table names and corresponding JSON file paths
    table_data = {
        "Family": "data/family_data.json",
        "Person": "data/person_data.json",
        "Event": "data/event_data.json",
        "Relationship": "data/relationship_data.json",
        "Users": "data/users_data.json",
    }

    # Loop through each table and seed data
    for table, json_file in table_data.items():
        print(f"Seeding {table} from {json_file}...")
        seed_data_from_json(table, json_file)

if __name__ == "__main__":
    seed_all_data()
