import json
from datetime import date, datetime
from app.database import get_db_connection

def export_table_to_json(table_name, file_name):
    query = f"SELECT * FROM {table_name};"
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]

    # Convert to a list of dictionaries and handle date serialization
    data = []
    for row in result:
        row_dict = dict(zip(columns, row))
        for key, value in row_dict.items():
            if isinstance(value, (date, datetime)):
                row_dict[key] = value.isoformat()  # Convert date to ISO 8601 string format
        data.append(row_dict)

    # Save to a JSON file
    with open(file_name, "w") as json_file:
        json.dump(data, json_file, indent=4)

if __name__ == "__main__":
    table_data = {
        "Person": "data/person_data.json",
        "Family": "data/family_data.json",
        "Event": "data/event_data.json",
        "Relationship": "data/relationship_data.json"
    }


    for table, file_name in table_data.items():
        export_table_to_json(table, file_name)
        print(f"Exported {table} to {file_name}")
