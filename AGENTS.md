# Evolution Tennis Club Website

## Project Name

Evolution Tennis Club  
进界网球俱乐部

## Purpose

This project is a premium financial forecast and business model presentation website for an urban tennis club in Changzhou, China.

It is not a traditional sports website, gym website, training center website, or franchise landing page.

The goal is to clearly present:

- the club model
- court economics
- membership and stored-value cashflow
- coaching economics
- member event revenue
- 36-month financial forecast
- deferred revenue logic
- dividend events
- key risks
- long-term expansion path

## Design Principles

- Dark editorial SaaS style
- Premium, calm, minimal
- Data-first visualization
- Large whitespace
- One core message per section
- Bilingual English + Chinese presentation
- No sports website aesthetics
- No stock photos
- No tennis player photos
- No logo dependency
- No neon effects
- No heavy shadows
- No PPT-style layouts
- No large Excel-like tables

## Visual Style

Use a refined dark visual system:

- Background: #0F1115
- Card background: rgba(255,255,255,0.03)
- Primary text: #F5F3EE
- Secondary text: #A7ADB7
- Accent color: #B7FF6A
- Risk color: #FF8B6A

The visual feeling should be closer to Stripe, Linear, Vercel, Raycast, or Mercury than a sports club website.

## Language Rules

The website must be bilingual.

Do not use a language toggle.

English and Chinese should appear together in the layout.

Examples:

Forecast  
财务预测

Cash Balance / 现金余额  
Court Booking / 订场  
Coaching / 私教  
Member Events / 会员活动  
Deferred Revenue / 递延收入

## Technical Stack

Use the existing stack unless the current project already differs:

- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide Icons if needed

## Data Architecture

All financial assumptions and chart data should be centralized in a dedicated data file, such as:

- src/data/financialModel.ts
- src/data/constants.ts

Do not hard-code financial numbers across individual components.

Components should consume data from the centralized data model.

## Financial Modeling Principles

The model should emphasize long-term operating quality rather than short-term hype.

Core principles:

- 36-month forecast, not 12-month forecast
- Quarterly visualization preferred
- Monthly data can exist underneath, but charts should mainly show quarters
- Cashflow and accounting profit are different
- Stored value improves liquidity but creates future obligations
- Deferred revenue must be explained clearly
- Revenue should be split into:
  - Court Booking / 订场
  - Coaching / 私教
  - Member Events / 会员活动
- Risk should be shown honestly
- Do not present the club as a guaranteed high-profit project

## Current Key Assumptions

Project:
- Opening date: 2026-10-01
- City: Changzhou, China
- Courts: 2 covered hard courts + 4 outdoor hard courts

Investment:
- Initial investor capital: ¥1,000,000
- CapEx: ¥1,560,000
- Pre-opening marketing: ¥40,000
- Rent: ¥20,000/month
- Rent paid semi-annually
- First 6 months of rent paid before opening
- Construction CapEx: 80% paid before opening, 20% paid in month 7

Membership:
- Pre-opening Gold members: 60
- Stable Gold target: 200
- Gold stored value: ¥8,000/person
- Gold growth:
  - first 6 months: +8/month
  - afterward: +5/month until 200
- Gold second stored-value purchase:
  - occurs 6-12 months after first stored value
  - distribute second purchases across that 6-month window
- Pre-opening Diamond members: 5
- Diamond stored value: ¥30,000/person
- No additional Diamond growth in the base model unless explicitly requested

Revenue:
- Public users contribute 20% of court booking revenue
- Gold/Diamond users contribute 80% of court booking revenue
- Revenue presentation should clearly show:
  - Court Booking
  - Coaching
  - Member Events

Coaching:
- Senior coach: 1 person
- Intermediate coach: 1 person
- Junior full-time coach: 1 person
- No part-time coach variable in the current model
- Senior capacity: 20 lessons/week, first-year load 50%
- Intermediate capacity: 20 lessons/week, first-year load 50%
- Junior capacity: 30 lessons/week, first-year load 60%
- 4.33 weeks/month
- Senior price: ¥4,500 / 10 lessons
- Intermediate price: ¥3,500 / 10 lessons
- Junior price: ¥2,500 / 10 lessons
- Senior commission: after deducting ¥120 court fee, 50% of remainder
- Intermediate commission: after deducting ¥120 court fee, 40% of remainder
- Junior commission: after deducting ¥60 court fee, 35% of remainder
- Fixed coach salary:
  - Senior: ¥5,000/month
  - Intermediate: ¥4,000/month
  - Junior: ¥2,500/month
- Coaching recognized revenue: about ¥650K/year
- Coaching net contribution: about ¥310K-320K/year

Member Events:
- Existing Midweek Match and Weekend Match remain
- Add one weekly Member Doubles Tournament:
  - 8 draws / 16 players
  - ¥80/person
- Non-tournament member activity profit:
  - ¥1,000/week
- Annual member event revenue/profit should be around ¥180K-190K

Tax:
- Tax cost = 5% of actual recognized sales

Dividends:
- First dividend event: end of 2027
- Second dividend event: end of 2028
- Dividend amount = 50% of accounting profit
- Dividend is distributed by equity ratio
- Show dividend events in cashflow charts

## Page Sections

Keep the website structure:

1. Evolution Tennis Club / 进界网球俱乐部
2. The Model / 项目模型
3. Courts / 场地模型
4. Membership / 会员体系
5. Coaching / 私教模型
6. Forecast / 财务预测
7. Cashflow / 现金流
8. Risks / 风险分析
9. Expansion / 增长路径
10. Vision / 长期主义

## Chart Requirements

The site should include:

- Hero KPI cards
- Revenue structure chart
- Court utilization heatmap
- Covered vs outdoor revenue contribution
- Gold member growth line
- Stored value and second-purchase cashflow chart
- Coaching capacity bars
- Coaching revenue vs net contribution chart
- 36-month cash balance chart
- Quarterly net cashflow bar chart
- Quarterly recognized revenue stacked chart
- Deferred revenue chart
- Cash balance vs deferred revenue chart
- Risk matrix

## Final Vision Copy

Use this final message:

A long-term urban tennis club,  
built around people,  
not transactions.

长期主义的城市网球 Club，  
围绕人与关系，  
而不只是交易。

Evolution Tennis Club  
进界网球俱乐部  
Changzhou, China
