-- Initialize ByteDB table
CREATE TABLE IF NOT EXISTS ByteDB (
    file_id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_path TEXT NOT NULL,
    department TEXT,
    owner TEXT,
    access_level TEXT DEFAULT 'private'
);

-- Insert sample data
INSERT INTO ByteDB (file_name, file_type, file_size, file_path, department, owner, access_level) VALUES
    ('annual_report_2023.pdf', 'pdf', 2048576, '/documents/reports/', 'Finance', 'John Doe', 'confidential'),
    ('employee_handbook.docx', 'docx', 1024288, '/documents/hr/', 'HR', 'Jane Smith', 'internal'),
    ('product_roadmap.xlsx', 'xlsx', 512000, '/documents/product/', 'Product', 'Mike Johnson', 'internal'),
    ('marketing_assets.zip', 'zip', 5242880, '/documents/marketing/', 'Marketing', 'Sarah Wilson', 'public'),
    ('source_code_v1.0.zip', 'zip', 10485760, '/documents/engineering/', 'Engineering', 'David Brown', 'restricted'),
    ('customer_data_2023.csv', 'csv', 1048576, '/documents/sales/', 'Sales', 'Lisa Anderson', 'confidential'),
    ('company_logo.png', 'png', 204800, '/documents/branding/', 'Marketing', 'Sarah Wilson', 'public'),
    ('security_policy.pdf', 'pdf', 1536000, '/documents/it/', 'IT', 'Tom Clark', 'internal'),
    ('financial_forecast.xlsx', 'xlsx', 768000, '/documents/finance/', 'Finance', 'John Doe', 'confidential'),
    ('api_documentation.md', 'md', 102400, '/documents/engineering/', 'Engineering', 'David Brown', 'internal');
