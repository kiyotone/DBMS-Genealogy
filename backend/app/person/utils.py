from ..database import get_db_connection

def get_position_in_hierarchy(person_id: int):
    query = """
    WITH RECURSIVE Ancestors AS (
        -- Base case: Start with the given person
        SELECT 
            p.PersonID, p.FirstName, p.LastName
        FROM Person p
        WHERE p.PersonID = %s 

        UNION ALL

        -- Recursively find parents moving UP the hierarchy
        SELECT 
            parent.PersonID, parent.FirstName, parent.LastName
        FROM Relationship r
        JOIN Person parent ON r.Person1ID = parent.PersonID  -- Parent ID
        JOIN Ancestors child ON r.Person2ID = child.PersonID -- Child ID
        WHERE r.RelationshipType = 'Father'
    )
    SELECT PersonID, FirstName, LastName FROM Ancestors;
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (person_id,))
            result = cursor.fetchall()

            hierarchy = [
                {"id": row[0], "firstname": row[1], "lastname": row[2]}
                for row in result
            ]
    
    return {"levels": len(hierarchy)-1, "hierarchy": hierarchy}


def get_descendants(person_id: int):
    query = """
    WITH RECURSIVE Descendants AS (
        -- Base case: Start with the given person
        SELECT 
            p.PersonID, 
            -1 AS SpouseID,  -- Default to -1 if no spouse
            -1 AS ParentID,  -- Default to -1 if no parent
            0 AS Level
        FROM Person p
        WHERE p.PersonID = %s 

        UNION ALL

        -- Recursively find children moving DOWN the hierarchy
        SELECT 
            child.PersonID, 
            COALESCE(spouse.PersonID, -1) AS SpouseID,  -- If no spouse, set to -1
            d.PersonID AS ParentID,  -- The parent is the current ancestor
            d.Level + 1 AS Level
        FROM Descendants d
        JOIN Relationship r ON d.PersonID = r.Person1ID  -- Parent ID
        JOIN Person child ON r.Person2ID = child.PersonID -- Child ID
        LEFT JOIN Relationship sp ON child.PersonID = sp.Person1ID AND sp.RelationshipType = 'Spouse'
        LEFT JOIN Person spouse ON sp.Person2ID = spouse.PersonID
        WHERE r.RelationshipType = 'Father'
    )
    SELECT PersonID, SpouseID, ParentID, Level 
    FROM Descendants 
    ORDER BY Level;
    """
    
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(query, (person_id,))
            result = cursor.fetchall()

            generations = {}
            for row in result:
                level = row[3]  # Level column
                member = {
                    "id": row[0],
                    "spouseId": row[1],
                    "parentId": row[2]
                }

                if level not in generations:
                    generations[level] = []
                generations[level].append(member)

            generations_list = [
                {"generation": level, "members": members} for level, members in generations.items()
            ]
    
    return {"generations": generations_list}
