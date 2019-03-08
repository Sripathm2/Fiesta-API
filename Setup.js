//This code is for setting up the db locally.

let bcrypt = require('bcrypt');
const { Pool, } = require('pg');

const connectionString = process.env.DB_URL;

const pool = new Pool({
    connectionString: connectionString,
});

const Insert_user = new Pool({
    connectionString: connectionString,
});

const feedback = new Pool({
    connectionString: connectionString,
});

const events = new Pool({
    connectionString: connectionString,
});

const designs = new Pool({
    connectionString: connectionString,
});

const wishlist = new Pool({
    connectionString: connectionString,
});

const questionanswer = new Pool({
    connectionString: connectionString,
});

const create_user_table = 'CREATE TABLE Users (userName VARCHAR(32) PRIMARY KEY, password text not null, email text not null, securityQuestion text not null, securityAnswer text not null, name text not null, notification text not null)';
const insert_user = 'INSERT INTO Users (userName, password, email , securityQuestion, securityAnswer, name, notification) VALUES (\'testUsername\',\'$2b$10$PhtMAduAs2i0wI/Uvs6DIepGMjz2JjooKNoDZ1dbYMweuWHGbleQK\', \'test@test.com\', \'what my name?\', \'test answer\', \'test test\', \'  \')';
const create_feedback_table = 'CREATE TABLE Feedback (feedbackText text)';
const create_events_table = 'CREATE TABLE Events (id SERIAL PRIMARY KEY, owner VARCHAR(32) not null, date TIMESTAMPTZ not null, location real[2] not null, partySupplier text not null, caterer text not null, guests text[])';
const create_designs_table = 'CREATE TABLE Designs (id integer PRIMARY KEY, designString text)';
const create_wishlist_table = 'CREATE TABLE Wishlist (id SERIAL PRIMARY KEY, userName VARCHAR(32) not null,item text not null)';
const create_ques_ans_table = 'CREATE TABLE Questionanswer (event_id text, questionUserName text, question text, questionID text, answerUsername text, answer text';

function create_user_table_function() {
    pool.query(create_user_table, (err, res) => {
        pool.end();

        Insert_user.query(insert_user, (err, res) => {
            Insert_user.end();
        });

    });
}

function create_question_answer_table_function() {
    questionanswer.query(create_ques_ans_table, (err, res) => {
        questionanswer.end();
    });
}

function create_wishlist_table_function() {
    wishlist.query(create_wishlist_table, (err, res) => {
        wishlist.end();
    })
}

function create_feedback_table_function() {
    feedback.query(create_feedback_table, (err, res) => {
        feedback.end();
    });
}

function create_events_table_function() {
    events.query(create_events_table, (err, res) => {
        events.end();
    });
}

function create_designs_table_function() {
    designs.query(create_designs_table, (err, res) => {
        designs.end();
    });
}

create_question_answer_table_function();
create_user_table_function();
create_feedback_table_function();
create_events_table_function();
create_designs_table_function();
create_wishlist_table_function();
