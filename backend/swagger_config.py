def configure_swagger(app):
    app.config['SWAGGER'] = {
        'title': 'Anomaly Detection API',
        'uiversion': 3
    }
