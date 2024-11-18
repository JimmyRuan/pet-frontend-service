class ConfigService {
    static getBaseUrl() {
        return process.env.API_URL || 'http://localhost:8000';
    }

    static getApiUrl(){
        return this.getBaseUrl() + '/api';
    }
}

export default ConfigService;
