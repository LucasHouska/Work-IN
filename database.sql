


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);


CREATE TABLE "exercises" (
"id" SERIAL PRIMARY KEY,
"exercise_name" VARCHAR(100),
"exercise_type" VARCHAR(50),
"main_muscle_worked" VARCHAR(50),
"exercise_equipment_needed" VARCHAR(50),
"difficulty_level" VARCHAR(50),
"exercise_instructions" VARCHAR(3000),
"exercise_benefits" VARCHAR(1000),
"exercise_image_1" VARCHAR(250),
"exercise_image_2" VARCHAR(250)
);


UPDATE "exercises"
SET  exercise_name = LOWER(exercise_name);


CREATE TABLE "workouts" (
"id" SERIAL PRIMARY KEY,
"user_id" INT NOT NULL,
"date" DATE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "workouts-exercises" (
"id" SERIAL PRIMARY KEY,
"workout_id" INT REFERENCES "workouts" NOT NULL,
"exercise_number_in_workout" INT NOT NULL,
"exercise_id" INT REFERENCES "exercises" NOT NULL,
"set_number" INT NOT NULL,
"repetitions" INT NOT NULL,
"weight" INT,
"notes" VARCHAR(500)
);


CREATE TABLE "program" (
"id" SERIAL PRIMARY KEY,
"program_number" INT NOT NULL,
"program_day" INT NOT NULL,
"exerciseNumberInWorkout" INT NOT NULL,
"exercise_id" INT REFERENCES "exercises" NOT NULL,
"number_of_sets" INT NOT NULL,
"number_of_reps" INT NOT NULL,
"weight" INT,
"user_id" INT REFERENCES "user" NOT NULL
);


CREATE TABLE "maxes" (
"id" SERIAL PRIMARY KEY,
"user_id" INT REFERENCES "user" NOT NULL,
"name_of_exercise" VARCHAR(50) NOT NULL,
"weight" INT NOT NULL,
"favorite" BOOLEAN DEFAULT FALSE
);