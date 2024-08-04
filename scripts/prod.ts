import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

// Initialize the database connection
const sql = neon(
  "postgresql://neondb_owner:HBN8ZO4aisIv@ep-flat-truth-a53xbhhf.us-east-2.aws.neon.tech/neondb?sslmode=require"
);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Clear existing data
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    // Insert courses
    await db.insert(schema.courses).values([
      { id: 1, title: "Spanish", imageSrc: "/es(Spain).svg" },
      { id: 2, title: "French", imageSrc: "/fr(france).svg" },
      { id: 3, title: "Croatian", imageSrc: "/hr(Croatia).svg" },
      { id: 4, title: "Italian", imageSrc: "/it(Italy).svg" },
      { id: 5, title: "Japanese", imageSrc: "/jp(Japan).svg" },
    ]);

    // Insert units
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Unit 2",
        description: "Learn some basics sentences in Spanish",
        order: 2,
      },
      {
        id: 3,
        courseId: 2,
        title: "Unit 1",
        description: "Learn the basics of French",
        order: 1,
      },
      {
        id: 4,
        courseId: 2,
        title: "Unit 2",
        description: "Learn some basics sentences in French",
        order: 2,
      },
    ]);

    // Insert lessons
    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Nouns" },
      { id: 2, unitId: 1, order: 2, title: "Basic Greetings" },
      { id: 3, unitId: 1, order: 3, title: "Additional Nouns" },
      { id: 4, unitId: 1, order: 4, title: "Fruits" },
      { id: 5, unitId: 1, order: 5, title: "Vegetables" },
      { id: 6, unitId: 2, order: 1, title: "Nouns" },
      { id: 7, unitId: 2, order: 2, title: "Basic Greetings" },
      { id: 8, unitId: 2, order: 3, title: "Additional Nouns" },
      { id: 9, unitId: 2, order: 4, title: "Fruits" },
      { id: 10, unitId: 2, order: 5, title: "Vegetables" },

      { id: 11, unitId: 3, order: 1, title: "Nouns" },
      { id: 12, unitId: 3, order: 2, title: "Basic Greetings" },
      { id: 13, unitId: 3, order: 3, title: "Additional Nouns" },
      { id: 14, unitId: 3, order: 4, title: "Fruits" },
      { id: 15, unitId: 3, order: 5, title: "Vegetables" },
      { id: 16, unitId: 4, order: 1, title: "Nouns" },
      { id: 17, unitId: 4, order: 2, title: "Basic Greetings" },
      { id: 18, unitId: 4, order: 3, title: "Additional Nouns" },
      { id: 19, unitId: 4, order: 4, title: "Fruits" },
      { id: 20, unitId: 4, order: 5, title: "Vegetables" },
    ]);

    // Insert challenges
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the man" ?',
      },
      { id: 2, lessonId: 1, order: 2, type: "ASSIST", question: '"the man"' },
      {
        id: 3,
        lessonId: 1,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the robot" ?',
      },
      {
        id: 4,
        lessonId: 2,
        order: 1,
        type: "ASSIST",
        question: 'Which one of these is "hello" ?',
      },
      {
        id: 5,
        lessonId: 2,
        order: 2,
        type: "ASSIST",
        question: 'Which one of these is "goodbye" ?',
      },
      {
        id: 6,
        lessonId: 2,
        order: 3,
        type: "ASSIST",
        question: 'Which one of these is "please" ?',
      },
      {
        id: 7,
        lessonId: 3,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the boy" ?',
      },
      {
        id: 8,
        lessonId: 3,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the girl" ?',
      },
      {
        id: 9,
        lessonId: 3,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the zombie" ?',
      },
      {
        id: 10,
        lessonId: 4,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the apple" ?',
      },
      {
        id: 11,
        lessonId: 4,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the banana" ?',
      },
      {
        id: 12,
        lessonId: 4,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the Mango" ?',
      },
      {
        id: 13,
        lessonId: 5,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the carrot" ?',
      },
      {
        id: 14,
        lessonId: 5,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the tomato" ?',
      },
      {
        id: 15,
        lessonId: 5,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the onion" ?',
      },
      {
        id: 16,
        lessonId: 6,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the man" ?',
      },
      { id: 17, lessonId: 6, order: 2, type: "ASSIST", question: '"the man"' },
      {
        id: 18,
        lessonId: 6,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the robot" ?',
      },
      {
        id: 19,
        lessonId: 7,
        order: 1,
        type: "ASSIST",
        question: 'Which one of these is "hello" ?',
      },
      {
        id: 20,
        lessonId: 7,
        order: 2,
        type: "ASSIST",
        question: 'Which one of these is "goodbye" ?',
      },
      {
        id: 21,
        lessonId: 7,
        order: 3,
        type: "ASSIST",
        question: 'Which one of these is "please" ?',
      },
      {
        id: 22,
        lessonId: 8,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the boy" ?',
      },
      {
        id: 23,
        lessonId: 8,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the girl" ?',
      },
      {
        id: 24,
        lessonId: 8,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the zombie" ?',
      },
      {
        id: 25,
        lessonId: 9,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the apple" ?',
      },
      {
        id: 26,
        lessonId: 9,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the banana" ?',
      },
      {
        id: 27,
        lessonId: 9,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the Mango" ?',
      },
      {
        id: 28,
        lessonId: 10,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the carrot" ?',
      },
      {
        id: 29,
        lessonId: 10,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the tomato" ?',
      },
      {
        id: 30,
        lessonId: 10,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the onion" ?',
      },
      {
        id: 31,
        lessonId: 11,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the man" ?',
      },
      {
        id: 32,
        lessonId: 11,
        order: 2,
        type: "ASSIST",
        question: '"the man"',
      },
      {
        id: 33,
        lessonId: 11,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the robot" ?',
      },
      {
        id: 34,
        lessonId: 12,
        order: 1,
        type: "ASSIST",
        question: 'Which one of these is "hello" ?',
      },
      {
        id: 35,
        lessonId: 12,
        order: 2,
        type: "ASSIST",
        question: 'Which one of these is "goodbye" ?',
      },
      {
        id: 36,
        lessonId: 12,
        order: 3,
        type: "ASSIST",
        question: 'Which one of these is "please" ?',
      },
      {
        id: 37,
        lessonId: 13,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the boy" ?',
      },
      {
        id: 38,
        lessonId: 13,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the girl" ?',
      },
      {
        id: 39,
        lessonId: 13,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the zombie" ?',
      },
      {
        id: 40,
        lessonId: 14,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the apple" ?',
      },
      {
        id: 41,
        lessonId: 14,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the banana" ?',
      },
      {
        id: 42,
        lessonId: 14,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the Mango" ?',
      },
      {
        id: 43,
        lessonId: 15,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the carrot" ?',
      },
      {
        id: 44,
        lessonId: 15,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the tomato" ?',
      },
      {
        id: 45,
        lessonId: 15,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the onion" ?',
      },
      {
        id: 46,
        lessonId: 16,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the man" ?',
      },
      {
        id: 47,
        lessonId: 16,
        order: 2,
        type: "ASSIST",
        question: '"the man"',
      },
      {
        id: 48,
        lessonId: 16,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the robot" ?',
      },
      {
        id: 49,
        lessonId: 17,
        order: 1,
        type: "ASSIST",
        question: 'Which one of these is "hello" ?',
      },
      {
        id: 50,
        lessonId: 17,
        order: 2,
        type: "ASSIST",
        question: 'Which one of these is "goodbye" ?',
      },
      {
        id: 51,
        lessonId: 17,
        order: 3,
        type: "ASSIST",
        question: 'Which one of these is "please" ?',
      },
      {
        id: 52,
        lessonId: 18,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the boy" ?',
      },
      {
        id: 53,
        lessonId: 18,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the girl" ?',
      },
      {
        id: 54,
        lessonId: 18,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the zombie" ?',
      },
      {
        id: 55,
        lessonId: 19,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the apple" ?',
      },
      {
        id: 56,
        lessonId: 19,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the banana" ?',
      },
      {
        id: 57,
        lessonId: 19,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the Mango" ?',
      },
      {
        id: 58,
        lessonId: 20,
        order: 2,
        type: "SELECT",
        question: 'Which one of these is "the carrot" ?',
      },
      {
        id: 59,
        lessonId: 20,
        order: 3,
        type: "SELECT",
        question: 'Which one of these is "the tomato" ?',
      },
      {
        id: 60,
        lessonId: 20,
        order: 1,
        type: "SELECT",
        question: 'Which one of these is "the onion" ?',
      },
    ]);

    // Insert challenge options
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 2,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 4,
        correct: true,
        text: "hola",
        audioSrc: "/es_hello.mp3",
      },
      {
        challengeId: 4,
        correct: false,
        text: "adios",
        audioSrc: "/es_goodbye.mp3",
      },
      {
        challengeId: 4,
        correct: false,
        text: "por favor",
        audioSrc: "/es_please.mp3",
      },
      {
        challengeId: 5,
        correct: false,
        text: "hola",
        audioSrc: "/es_hello.mp3",
      },
      {
        challengeId: 5,
        correct: true,
        text: "adios",
        audioSrc: "/es_goodbye.mp3",
      },
      {
        challengeId: 5,
        correct: false,
        text: "por favor",
        audioSrc: "/es_please.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "hola",
        audioSrc: "/es_hello.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "adios",
        audioSrc: "/es_goodbye.mp3",
      },
      {
        challengeId: 6,
        correct: true,
        text: "por favor",
        audioSrc: "/es_please.mp3",
      },
      {
        challengeId: 7,
        imageSrc: "/boy.svg",
        correct: true,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 7,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 7,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
      {
        challengeId: 8,
        imageSrc: "/boy.svg",
        correct: false,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 8,
        imageSrc: "/girl.svg",
        correct: true,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 8,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
      {
        challengeId: 9,
        imageSrc: "/boy.svg",
        correct: false,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 9,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 9,
        imageSrc: "/zombie.svg",
        correct: true,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
      {
        challengeId: 10,
        imageSrc: "/apple.svg",
        correct: true,
        text: "la manzana",
        audioSrc: "/es_apple.mp3",
      },
      {
        challengeId: 10,
        imageSrc: "/banana.svg",
        correct: false,
        text: "el plátano",
        audioSrc: "/es_banana.mp3",
      },
      {
        challengeId: 10,
        imageSrc: "/mango.svg",
        correct: false,
        text: "el mango",
        audioSrc: "/es_mango.mp3",
      },
      {
        challengeId: 11,
        imageSrc: "/apple.svg",
        correct: false,
        text: "la manzana",
        audioSrc: "/es_apple.mp3",
      },
      {
        challengeId: 11,
        imageSrc: "/banana.svg",
        correct: true,
        text: "el plátano",
        audioSrc: "/es_banana.mp3",
      },
      {
        challengeId: 11,
        imageSrc: "/mango.svg",
        correct: false,
        text: "el mango",
        audioSrc: "/es_mango.mp3",
      },
      {
        challengeId: 12,
        imageSrc: "/apple.svg",
        correct: false,
        text: "la manzana",
        audioSrc: "/es_apple.mp3",
      },
      {
        challengeId: 12,
        imageSrc: "/banana.svg",
        correct: false,
        text: "el plátano",
        audioSrc: "/es_banana.mp3",
      },
      {
        challengeId: 12,
        imageSrc: "/mango.svg",
        correct: true,
        text: "el mango",
        audioSrc: "/es_mango.mp3",
      },
      {
        challengeId: 13,
        imageSrc: "/carrot.svg",
        correct: true,
        text: "la zanahoria",
        audioSrc: "/es_carrot.mp3",
      },
      {
        challengeId: 13,
        imageSrc: "/tomato.svg",
        correct: false,
        text: "el tomate",
        audioSrc: "/es_tomato.mp3",
      },
      {
        challengeId: 13,
        imageSrc: "/onion.svg",
        correct: false,
        text: "la cebolla",
        audioSrc: "/es_onion.mp3",
      },
      {
        challengeId: 14,
        imageSrc: "/carrot.svg",
        correct: false,
        text: "la zanahoria",
        audioSrc: "/es_carrot.mp3",
      },
      {
        challengeId: 14,
        imageSrc: "/tomato.svg",
        correct: true,
        text: "el tomate",
        audioSrc: "/es_tomato.mp3",
      },
      {
        challengeId: 14,
        imageSrc: "/onion.svg",
        correct: false,
        text: "la cebolla",
        audioSrc: "/es_onion.mp3",
      },
      {
        challengeId: 15,
        imageSrc: "/carrot.svg",
        correct: false,
        text: "la zanahoria",
        audioSrc: "/es_carrot.mp3",
      },
      {
        challengeId: 15,
        imageSrc: "/tomato.svg",
        correct: false,
        text: "el tomate",
        audioSrc: "/es_tomato.mp3",
      },
      {
        challengeId: 15,
        imageSrc: "/onion.svg",
        correct: true,
        text: "la cebolla",
        audioSrc: "/es_onion.mp3",
      },
      {
        challengeId: 16,
        imageSrc: "/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 16,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 16,
        imageSrc: "/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 17,
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 17,
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 17,
        correct: false,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 18,
        imageSrc: "/man.svg",
        correct: false,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 18,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 18,
        imageSrc: "/robot.svg",
        correct: true,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
      },
      {
        challengeId: 19,
        correct: true,
        text: "hola",
        audioSrc: "/es_hello.mp3",
      },
      {
        challengeId: 19,
        correct: false,
        text: "adios",
        audioSrc: "/es_goodbye.mp3",
      },
      {
        challengeId: 19,
        correct: false,
        text: "por favor",
        audioSrc: "/es_please.mp3",
      },
      {
        challengeId: 20,
        correct: false,
        text: "hola",
        audioSrc: "/es_hello.mp3",
      },
      {
        challengeId: 20,
        correct: true,
        text: "adios",
        audioSrc: "/es_goodbye.mp3",
      },
      {
        challengeId: 20,
        correct: false,
        text: "por favor",
        audioSrc: "/es_please.mp3",
      },
      {
        challengeId: 21,
        correct: false,
        text: "hola",
        audioSrc: "/es_hello.mp3",
      },
      {
        challengeId: 21,
        correct: false,
        text: "adios",
        audioSrc: "/es_goodbye.mp3",
      },
      {
        challengeId: 21,
        correct: true,
        text: "por favor",
        audioSrc: "/es_please.mp3",
      },
      {
        challengeId: 22,
        imageSrc: "/boy.svg",
        correct: true,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 22,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 22,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
      {
        challengeId: 23,
        imageSrc: "/boy.svg",
        correct: false,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 23,
        imageSrc: "/girl.svg",
        correct: true,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 23,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
      {
        challengeId: 24,
        imageSrc: "/boy.svg",
        correct: false,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        challengeId: 24,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la niña",
        audioSrc: "/es_girl.mp3",
      },
      {
        challengeId: 24,
        imageSrc: "/zombie.svg",
        correct: true,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
      {
        challengeId: 25,
        imageSrc: "/apple.svg",
        correct: true,
        text: "la manzana",
        audioSrc: "/es_apple.mp3",
      },
      {
        challengeId: 25,
        imageSrc: "/banana.svg",
        correct: false,
        text: "el plátano",
        audioSrc: "/es_banana.mp3",
      },
      {
        challengeId: 25,
        imageSrc: "/mango.svg",
        correct: false,
        text: "el mango",
        audioSrc: "/es_mango.mp3",
      },
      {
        challengeId: 26,
        imageSrc: "/apple.svg",
        correct: false,
        text: "la manzana",
        audioSrc: "/es_apple.mp3",
      },
      {
        challengeId: 26,
        imageSrc: "/banana.svg",
        correct: true,
        text: "el plátano",
        audioSrc: "/es_banana.mp3",
      },
      {
        challengeId: 26,
        imageSrc: "/mango.svg",
        correct: false,
        text: "el mango",
        audioSrc: "/es_mango.mp3",
      },
      {
        challengeId: 27,
        imageSrc: "/apple.svg",
        correct: false,
        text: "la manzana",
        audioSrc: "/es_apple.mp3",
      },
      {
        challengeId: 27,
        imageSrc: "/banana.svg",
        correct: false,
        text: "el plátano",
        audioSrc: "/es_banana.mp3",
      },
      {
        challengeId: 27,
        imageSrc: "/mango.svg",
        correct: true,
        text: "el mango",
        audioSrc: "/es_mango.mp3",
      },
      {
        challengeId: 28,
        imageSrc: "/carrot.svg",
        correct: true,
        text: "la zanahoria",
        audioSrc: "/es_carrot.mp3",
      },
      {
        challengeId: 28,
        imageSrc: "/tomato.svg",
        correct: false,
        text: "el tomate",
        audioSrc: "/es_tomato.mp3",
      },
      {
        challengeId: 28,
        imageSrc: "/onion.svg",
        correct: false,
        text: "la cebolla",
        audioSrc: "/es_onion.mp3",
      },
      {
        challengeId: 29,
        imageSrc: "/carrot.svg",
        correct: false,
        text: "la zanahoria",
        audioSrc: "/es_carrot.mp3",
      },
      {
        challengeId: 29,
        imageSrc: "/tomato.svg",
        correct: true,
        text: "el tomate",
        audioSrc: "/es_tomato.mp3",
      },
      {
        challengeId: 29,
        imageSrc: "/onion.svg",
        correct: false,
        text: "la cebolla",
        audioSrc: "/es_onion.mp3",
      },
      {
        challengeId: 30,
        imageSrc: "/carrot.svg",
        correct: false,
        text: "la zanahoria",
        audioSrc: "/es_carrot.mp3",
      },
      {
        challengeId: 30,
        imageSrc: "/tomato.svg",
        correct: false,
        text: "el tomate",
        audioSrc: "/es_tomato.mp3",
      },
      {
        challengeId: 30,
        imageSrc: "/onion.svg",
        correct: true,
        text: "la cebolla",
        audioSrc: "/es_onion.mp3",
      },
      {
        challengeId: 31,
        imageSrc: "/man.svg",
        correct: true,
        text: "l'homme",
        audioSrc: "/fr_man.mp3",
      },
      {
        challengeId: 31,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la femme",
        audioSrc: "/fr_woman.mp3",
      },
      {
        challengeId: 31,
        imageSrc: "/robot.svg",
        correct: false,
        text: "le robot",
        audioSrc: "/fr_robot.mp3",
      },
      {
        challengeId: 32,
        correct: true,
        text: "l'homme",
        audioSrc: "/fr_man.mp3",
      },
      {
        challengeId: 32,
        correct: false,
        text: "la femme",
        audioSrc: "/fr_woman.mp3",
      },
      {
        challengeId: 32,
        correct: false,
        text: "le robot",
        audioSrc: "/fr_robot.mp3",
      },
      {
        challengeId: 33,
        imageSrc: "/man.svg",
        correct: false,
        text: "l'homme",
        audioSrc: "/fr_man.mp3",
      },
      {
        challengeId: 33,
        imageSrc: "/woman.svg",
        correct: false,
        text: "la femme",
        audioSrc: "/fr_woman.mp3",
      },
      {
        challengeId: 33,
        imageSrc: "/robot.svg",
        correct: true,
        text: "le robot",
        audioSrc: "/fr_robot.mp3",
      },
      {
        challengeId: 34,
        correct: true,
        text: "bonjour",
        audioSrc: "/fr_hello.mp3",
      },
      {
        challengeId: 34,
        correct: false,
        text: "au revoir",
        audioSrc: "/fr_goodbye.mp3",
      },
      {
        challengeId: 34,
        correct: false,
        text: "s'il vous plaît",
        audioSrc: "/fr_please.mp3",
      },
      {
        challengeId: 35,
        correct: false,
        text: "bonjour",
        audioSrc: "/fr_hello.mp3",
      },
      {
        challengeId: 35,
        correct: true,
        text: "au revoir",
        audioSrc: "/fr_goodbye.mp3",
      },
      {
        challengeId: 35,
        correct: false,
        text: "s'il vous plaît",
        audioSrc: "/fr_please.mp3",
      },
      {
        challengeId: 36,
        correct: false,
        text: "bonjour",
        audioSrc: "/fr_hello.mp3",
      },
      {
        challengeId: 36,
        correct: false,
        text: "au revoir",
        audioSrc: "/fr_goodbye.mp3",
      },
      {
        challengeId: 36,
        correct: true,
        text: "s'il vous plaît",
        audioSrc: "/fr_please.mp3",
      },
      {
        challengeId: 37,
        imageSrc: "/boy.svg",
        correct: true,
        text: "le garçon",
        audioSrc: "/fr_boy.mp3",
      },
      {
        challengeId: 37,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la fille",
        audioSrc: "/fr_girl.mp3",
      },
      {
        challengeId: 37,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "le zombie",
        audioSrc: "/fr_zombie.mp3",
      },
      {
        challengeId: 38,
        imageSrc: "/boy.svg",
        correct: false,
        text: "le garçon",
        audioSrc: "/fr_boy.mp3",
      },
      {
        challengeId: 38,
        imageSrc: "/girl.svg",
        correct: true,
        text: "la fille",
        audioSrc: "/fr_girl.mp3",
      },
      {
        challengeId: 38,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "le zombie",
        audioSrc: "/fr_zombie.mp3",
      },
      {
        challengeId: 39,
        imageSrc: "/boy.svg",
        correct: false,
        text: "le garçon",
        audioSrc: "/fr_boy.mp3",
      },
      {
        challengeId: 39,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la fille",
        audioSrc: "/fr_girl.mp3",
      },
      {
        challengeId: 39,
        imageSrc: "/zombie.svg",
        correct: true,
        text: "le zombie",
        audioSrc: "/fr_zombie.mp3",
      },
      {
        challengeId: 40,
        imageSrc: "/apple.svg",
        correct: true,
        text: "la pomme",
        audioSrc: "/fr_apple.mp3",
      },
      {
        challengeId: 40,
        imageSrc: "/banana.svg",
        correct: false,
        text: "la banane",
        audioSrc: "/fr_banana.mp3",
      },
      {
        challengeId: 40,
        imageSrc: "/mango.svg",
        correct: false,
        text: "la mangue",
        audioSrc: "/fr_mango.mp3",
      },
      {
        challengeId: 41,
        imageSrc: "/apple.svg",
        correct: false,
        text: "la pomme",
        audioSrc: "/fr_apple.mp3",
      },
      {
        challengeId: 41,
        imageSrc: "/banana.svg",
        correct: true,
        text: "la banane",
        audioSrc: "/fr_banana.mp3",
      },
      {
        challengeId: 41,
        imageSrc: "/mango.svg",
        correct: false,
        text: "la mangue",
        audioSrc: "/fr_mango.mp3",
      },
      {
        challengeId: 42,
        imageSrc: "/apple.svg",
        correct: false,
        text: "la pomme",
        audioSrc: "/fr_apple.mp3",
      },
      {
        challengeId: 42,
        imageSrc: "/banana.svg",
        correct: false,
        text: "la banane",
        audioSrc: "/fr_banana.mp3",
      },
      {
        challengeId: 42,
        imageSrc: "/mango.svg",
        correct: true,
        text: "la mangue",
        audioSrc: "/fr_mango.mp3",
      },
      {
        challengeId: 43,
        imageSrc: "/carrot.svg",
        correct: true,
        text: "la carotte",
        audioSrc: "/fr_carrot.mp3",
      },
      {
        challengeId: 43,
        imageSrc: "/tomato.svg",
        correct: false,
        text: "la tomate",
        audioSrc: "/fr_tomato.mp3",
      },
      {
        challengeId: 43,
        imageSrc: "/onion.svg",
        correct: false,
        text: "l'oignon",
        audioSrc: "/fr_onion.mp3",
      },
      {
        challengeId: 44,
        imageSrc: "/carrot.svg",
        correct: false,
        text: "la carotte",
        audioSrc: "/fr_carrot.mp3",
      },
      {
        challengeId: 44,
        imageSrc: "/tomato.svg",
        correct: true,
        text: "la tomate",
        audioSrc: "/fr_tomato.mp3",
      },
      {
        challengeId: 44,
        imageSrc: "/onion.svg",
        correct: false,
        text: "l'oignon",
        audioSrc: "/fr_onion.mp3",
      },
      {
        challengeId: 45,
        imageSrc: "/carrot.svg",
        correct: false,
        text: "la carotte",
        audioSrc: "/fr_carrot.mp3",
      },
      {
        challengeId: 45,
        imageSrc: "/tomato.svg",
        correct: false,
        text: "la tomate",
        audioSrc: "/fr_tomato.mp3",
      },
      {
        challengeId: 45,
        imageSrc: "/onion.svg",
        correct: true,
        text: "l'oignon",
        audioSrc: "/fr_onion.mp3",
      },
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database", error);
  }
};

main();