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

const event1 = new Pool({
    connectionString: connectionString,
});

const rsvps = new Pool({
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

const create_designs_table = 'CREATE TABLE Designs (id integer PRIMARY KEY, designString text)';
const create_wishlist_table = 'CREATE TABLE Wishlist (id SERIAL PRIMARY KEY, userName VARCHAR(32) not null,item text not null)';
const create_ques_ans_table = 'CREATE TABLE Questionanswer (event_id text, questionUserName text, question text, questionID text, answerUsername text, answer text)';
const create_events_table = 'CREATE TABLE Events (id text PRIMARY KEY, owner VARCHAR(32) not null, date TIMESTAMPTZ not null, location real[2] not null, partySupplier text not null, caterer text not null, guests text[], images text[], tasks text[])';

const insert_events1 = 'INSERT INTO Events (id, owner, date, location, partySupplier, caterer, guests) VALUES(\'ef0f5596-4049-11e9-b210-d663bd873d93\', \'owner1\', \'2019-03-04 20:21:32\',\'{0,0}\',\'none\',\'none\',\'{none}\')';
const create_rsvp_table = 'CREATE TABLE Rsvp (userName VARCHAR(32) not null, eventID text not null, status text, PRIMARY KEY (userName, eventID))';

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
        event1.query(insert_events1, (err, res) => {
            event1.end();
        });
    });
}

function create_designs_table_function() {
    designs.query(create_designs_table, (err, res) => {
        designs.end();
    });
}

function create_rsvp_table_function() {
    rsvps.query(create_rsvp_table, (err, res) => {
        rsvps.end();
    });
}

create_question_answer_table_function();
create_user_table_function();
create_feedback_table_function();
create_events_table_function();
create_designs_table_function();
create_wishlist_table_function();
create_rsvp_table_function();
