@app.route('/api/project/getProjectById', methods=['POST'])
def get_project_by_id():
    data = request.json
    user_id = data.get('user_id')

    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT *
        FROM project
        WHERE user_id = %s;
    """, (user_id,))

    project = dictfetchall(cur)
    cur.close()

    if project:
        return jsonify({'success': True, 'data': project}), 200
    else:
        return jsonify({'error': 'Project not found'}), 404
    
@app.route('/api/project/createProject', methods=['POST'])
def create_project():
    try:
        # Get the data from the request
        data = request.json
        
        # Extract the required fields
        json_id = data.get('json_id')
        source_id = data.get('source_id')
        title = data.get('title')
        upload_date = data.get('upload_date')  # Expecting date in string format, e.g., '2024-09-10 14:30:00'
        duration = data.get('duration')
        save_status = data.get('save_status')
        heatmap_path = data.get('heatmap_path')
        user_id = data.get('user_id')
        
        # Validate required fields
        if not all([source_id, title, upload_date, duration, user_id]):
            return jsonify({'error': 'source_id, title, upload_date, duration, and user_id are required'}), 400

        # Convert upload_date from string to datetime
        try:
            upload_date = datetime.strptime(upload_date, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD HH:MM:SS'}), 400

        # Insert into the project table
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO project (json_id, source_id, title, upload_date, duration, save_status, heatmap_path, user_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (json_id, source_id, title, upload_date, duration, save_status, heatmap_path, user_id))
        
        # Commit the transaction
        mysql.connection.commit()
        cur.close()

        return jsonify({'success': True, 'message': 'Project created successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/project/modifyProject', methods=['PUT'])
def modify_project():
    try:
        # Get the data from the request
        data = request.json
        project_id = data.get('project_id')
        new_title = data.get('title')  # New project title

        # Validate the required fields
        if not all([project_id, new_title]):
            return jsonify({'error': 'project_id and title are required'}), 400

        # Get the current datetime
        current_datetime = datetime.now()

        # Update the project title and upload_date
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE project 
            SET title = %s, upload_date = %s
            WHERE project_id = %s
        """, (new_title, current_datetime, project_id))
        
        # Commit the transaction
        mysql.connection.commit()
        cur.close()

        return jsonify({'success': True, 'message': 'Project updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/project/getVideo', methods=['POST'])
def get_video():
    data = request.json
    title = data.get('title')
    
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT v.file_path 
        FROM video v 
        JOIN project p ON p.source_id = v.video_id
        WHERE p.title = %s;
    """, (title,))
    
    video = cur.fetchone()
    cur.close()
    
    if video:
        return jsonify({'file_path': video[0]})
    else:
        return jsonify({'error': 'Video not found'}), 404

@app.route('/api/project/getAnomaliesByProject', methods=['POST'])
def get_anomalies_by_project():
    try:
        # Get the JSON data from the POST request
        data = request.json
        project_id = data.get('project_id')

        # Check if the project_id is provided in the request
        if not project_id:
            return jsonify({'error': 'project_id is required'}), 400

        # Query the database for anomalies by project_id
        cur = mysql.connection.cursor()
        cur.execute("""
            SELECT anomaly_id, project_id, timestamp, type, duration, participants, intensity, evidence 
            FROM anomaly 
            WHERE project_id = %s;
        """, (project_id,))
        
        anomalies = dictfetchall(cur)
        cur.close()

        # Return anomalies if found
        if anomalies:
            return jsonify({'success': True, 'data': anomalies}), 200
        else:
            return jsonify({'error': 'No anomalies found for the given project_id'}), 404

    except Exception as e:
        # Return error message in case of any exceptions
        return jsonify({'error': str(e)}), 500