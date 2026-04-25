---
title: "Agentic Programming in Teams"
author: "Vikram S. Negi"
date: 2026-04-06
description: "Why does agentic programming fail in collaborative software development?"
tags: ["ai", "dev"]
---

Agentic programming is the new industry buzzword that refers to an autonomous AI agent that (when prompted, of course) plans, writes, and modifies a software codebase with minimal human intervention. Working within a team has made me realize that it often struggles in collaborative software development settings.

An LLM may be a good programmer, but what it lacks is consistency when it comes to style or coding techniques. Now, this is to be expected, as LLMs are simpletons and, in most cases, generate code based on patterns learned from others. This seems to contradict the understanding that these are stochastic models that generate probabilistic tokens. However, when writing code, even a single deviation from the norm (i.e., the highest-probability token) can lead to hallucinations or syntax errors, that's why they are trained to output exact code from their training set.

## Shared Architecture

Before development begins, a team usually decides what and how they are going to build the software. There is a shared model of how the program should work, and how the goals or user stories are created and respected. UML diagrams and other representations are used to simplify and visualize different components of the software.

AI agents work from local prompts and struggle to maintain the broader mental model of the architecture. This leads them to produce misaligned code that may run fine, but is not what the developers had in mind when they began working on the project.

## Refactoring Code

Here is a situation I found myself in:

I was working on a feature branch and successfully implemented a feature. Along the way, I fixed some minor bugs, and everything was working smoothly. Then one of my team members decided it was a good idea to let the AI agent perform code edits. Unfortunately, this was not the first time it had happened.

The bot decided that the code was subpar and needed refactoring. Essentially, I received a pull request with 2,621 lines of code added and 1,626 lines deleted from code I had just written and fully understood. I didn’t even know whether to laugh or cry.

I had just implemented something, and before even properly testing it, the bot wanted to refactor and make sweeping changes. There is a structure to how humans write code, but an agent may go rogue and change expected models and data structures across multiple modules.

Because of these inconsistencies and the lack of reliability, I dislike working with fully autonomous AI agents and would never treat them as equal members of a development team. How can I keep up with a bot that constantly makes changes to the codebase? I don’t know how a human can realistically keep track of it without using another AI agent themselves.

## Blame the Human, Not the AI Agent

I like AI tools - code completions and hints to help with writing functions are great. But letting an agent generate large amounts of unchecked or poorly aligned code is my pet peeve. I would like to think that perhaps giving AI agents the entire scope of a project is the real mistake. Instead, if you use them, make sure they are working within a limited and well-defined scope so that any problems or bugs they introduce remain contained.

And sometimes, just write the code yourself.
