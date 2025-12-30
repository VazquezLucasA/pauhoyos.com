-- Tabla de psicólogos
CREATE TABLE IF NOT EXISTS psychologists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  bio TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de disponibilidades
CREATE TABLE IF NOT EXISTS availabilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  psychologist_id INT NOT NULL,
  weekday TINYINT NOT NULL COMMENT '0=Domingo, 6=Sábado',
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_minutes INT DEFAULT 30,
  is_active TINYINT(1) DEFAULT 1,
  FOREIGN KEY (psychologist_id) REFERENCES psychologists(id) ON DELETE CASCADE
);

-- Tabla de turnos
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  psychologist_id INT NOT NULL,
  start_datetime DATETIME NOT NULL,
  duration_minutes INT NOT NULL,
  status ENUM('scheduled','cancelled_by_user','cancelled_by_psychologist','completed','no_show') DEFAULT 'scheduled',
  cancellation_reason TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (psychologist_id) REFERENCES psychologists(id) ON DELETE CASCADE
);
