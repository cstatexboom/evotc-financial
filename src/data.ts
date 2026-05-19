export const colors = {
  bg: '#0F1115',
  card: 'rgba(255,255,255,0.03)',
  text: '#F5F3EE',
  muted: '#A7ADB7',
  highlight: '#B7FF6A',
  risk: '#FF8B6A',
  covered: '#D7F9A5',
  outdoor: '#8BB8FF',
  coaching: '#C7B6FF',
  event: '#FFD48A',
  cash: '#B7FF6A',
  deferred: '#FF8B6A',
  storedFirst: '#8BB8FF',
  storedRenewal: '#FFD48A',
};

export const project = {
  name: 'Evolution Tennis Club',
  cnName: '进界网球俱乐部',
  city: 'Changzhou, China',
  openingDate: '2026-10-01',
  trialOpening: '2026-09',
  courts: { covered: 2, outdoor: 4, total: 6 },
  investorCapital: 1_000_000,
  capex: 1_560_000,
  preOpeningMarketing: 40_000,
  rentMonthly: 20_000,
  rentHalfYear: 120_000,
};

export const operating = {
  monthlyFixedWithoutRentCash: 38_900,
  taxRate: 0.05,
  dividendProfitShare: 0.5,
};

export const courtModel = {
  winterDayHours: 8,
  summerDayHours: 9,
  eveningHours: 6,
  weekdays: 22,
  weekends: 8,
  prices: {
    outdoor: { weekdayDay: 60, weekdayEvening: 80, weekendDay: 80, weekendEvening: 100 },
    covered: { weekdayDay: 140, weekdayEvening: 180, weekendDay: 160, weekendEvening: 200 },
  },
  utilization: {
    covered: { weekdayDay: 0.1, weekdayEvening: 0.5, weekendDay: 0.2, weekendEvening: 0.6 },
    outdoor: { weekdayDay: 0.15, weekdayEvening: 0.55, weekendDay: 0.25, weekendEvening: 0.65 },
  },
  rainySeasonMonth: 5,
  rainyOutdoorUtilization: 0.1,
};

export const membership = {
  preOpeningGold: 60,
  stableGoldTarget: 200,
  firstSixMonthsAdds: 8,
  laterMonthlyAdds: 5,
  goldStoredValue: 6_000,
  renewalStartOffset: 7,
  renewalEndOffset: 11,
  preOpeningDiamond: 5,
  diamondStoredValue: 30_000,
  publicBookingShare: 0.2,
  memberBookingShare: 0.8,
};

export const coaching = {
  weeksPerMonth: 4.33,
  roles: [
    { name: 'Senior / 高级', weeklyCapacity: 20, load: 0.5, pricePerLesson: 450, courtFee: 120, split: 0.5, fixedSalary: 5_000 },
    { name: 'Intermediate / 中级', weeklyCapacity: 20, load: 0.5, pricePerLesson: 350, courtFee: 120, split: 0.4, fixedSalary: 4_000 },
    { name: 'Junior / 初级', weeklyCapacity: 30, load: 0.6, pricePerLesson: 250, courtFee: 60, split: 0.35, fixedSalary: 2_500 },
  ],
};

export const memberEvents = {
  weeksPerMonth: 4.33,
  midweek: { people: 8, publicPrice: 100, memberPrice: 80, publicShare: 0.2, memberShare: 0.8 },
  weekend: { people: 8, memberOnlyPrice: 80 },
  doublesTournament: { draws: 8, players: 16, pricePerPlayer: 80 },
  nonTournamentProfitPerWeek: 1_000,
};

type CourtType = 'covered' | 'outdoor';
type Slot = 'weekdayDay' | 'weekdayEvening' | 'weekendDay' | 'weekendEvening';

const slots: Array<{ key: Slot; dayType: 'weekdays' | 'weekends'; hours: 'day' | 'evening' }> = [
  { key: 'weekdayDay', dayType: 'weekdays', hours: 'day' },
  { key: 'weekdayEvening', dayType: 'weekdays', hours: 'evening' },
  { key: 'weekendDay', dayType: 'weekends', hours: 'day' },
  { key: 'weekendEvening', dayType: 'weekends', hours: 'evening' },
];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currency = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export const formatCurrency = (value: number) => `¥${currency.format(Math.round(value))}`;
export const compactCurrency = (value: number) => {
  if (Math.abs(value) >= 1_000_000) return `¥${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `¥${Math.round(value / 1_000)}K`;
  return formatCurrency(value);
};

function makeMonths() {
  return Array.from({ length: 36 }, (_, index) => {
    const monthNumber = (9 + index) % 12;
    const year = 2026 + Math.floor((9 + index) / 12);
    const quarter = Math.floor(monthNumber / 3) + 1;
    const label = `${monthNames[monthNumber]} ${String(year).slice(2)}`;
    const quarterLabel = `${year} Q${quarter}`;
    const season = monthNumber >= 5 && monthNumber <= 8 ? 'summer' : 'winter';
    return { index, monthNumber, year, quarter, label, quarterLabel, season };
  });
}

export const months = makeMonths();
type Month = (typeof months)[number];

function dayHours(month: Month) {
  return month.season === 'summer' ? courtModel.summerDayHours : courtModel.winterDayHours;
}

function slotRevenue(month: Month, type: CourtType, slot: Slot) {
  const meta = slots.find((item) => item.key === slot)!;
  const hours = meta.hours === 'day' ? dayHours(month) : courtModel.eveningHours;
  const days = courtModel[meta.dayType];
  const normalUtil = courtModel.utilization[type][slot];
  const utilization =
    type === 'outdoor' && month.monthNumber === courtModel.rainySeasonMonth
      ? (normalUtil + courtModel.rainyOutdoorUtilization) / 2
      : normalUtil;

  return project.courts[type] * days * hours * courtModel.prices[type][slot] * utilization;
}

function monthlyCourtRevenue(month: Month) {
  const covered = slots.reduce((sum, slot) => sum + slotRevenue(month, 'covered', slot.key), 0);
  const outdoor = slots.reduce((sum, slot) => sum + slotRevenue(month, 'outdoor', slot.key), 0);
  return { covered, outdoor, total: covered + outdoor };
}

const coachingRows = coaching.roles.map((role) => {
  const lessons = role.weeklyCapacity * role.load * coaching.weeksPerMonth;
  const revenue = lessons * role.pricePerLesson;
  const variablePayout = lessons * (role.pricePerLesson - role.courtFee) * role.split;
  const netAfterFixed = revenue - variablePayout - role.fixedSalary;
  return { ...role, lessons, revenue, variablePayout, netAfterFixed };
});

const monthlyCoachingRevenue = coachingRows.reduce((sum, row) => sum + row.revenue, 0);
const monthlyCoachingVariablePayout = coachingRows.reduce((sum, row) => sum + row.variablePayout, 0);
const monthlyCoachingFixedSalary = coachingRows.reduce((sum, row) => sum + row.fixedSalary, 0);
const monthlyCoachingGrossContribution = monthlyCoachingRevenue - monthlyCoachingVariablePayout;
const monthlyCoachingNetContribution = monthlyCoachingGrossContribution - monthlyCoachingFixedSalary;

export const coachingSummary = {
  rows: coachingRows,
  monthlyRevenue: monthlyCoachingRevenue,
  monthlyVariablePayout: monthlyCoachingVariablePayout,
  monthlyFixedSalary: monthlyCoachingFixedSalary,
  monthlyGrossContribution: monthlyCoachingGrossContribution,
  monthlyNetContribution: monthlyCoachingNetContribution,
  annualRevenue: monthlyCoachingRevenue * 12,
  annualNetContribution: monthlyCoachingNetContribution * 12,
};

const midweekRevenue =
  memberEvents.midweek.people *
  (memberEvents.midweek.publicPrice * memberEvents.midweek.publicShare +
    memberEvents.midweek.memberPrice * memberEvents.midweek.memberShare) *
  memberEvents.weeksPerMonth;
const weekendRevenue = memberEvents.weekend.people * memberEvents.weekend.memberOnlyPrice * memberEvents.weeksPerMonth;
const doublesRevenue =
  memberEvents.doublesTournament.players * memberEvents.doublesTournament.pricePerPlayer * memberEvents.weeksPerMonth;
const nonTournamentRevenue = memberEvents.nonTournamentProfitPerWeek * memberEvents.weeksPerMonth;

export const eventSummary = {
  monthlyRevenue: midweekRevenue + weekendRevenue + doublesRevenue + nonTournamentRevenue,
  annualRevenue: (midweekRevenue + weekendRevenue + doublesRevenue + nonTournamentRevenue) * 12,
};

const preOpeningStoredValue =
  membership.preOpeningGold * membership.goldStoredValue +
  membership.preOpeningDiamond * membership.diamondStoredValue;

const preOpeningCash =
  project.investorCapital +
  preOpeningStoredValue -
  project.capex * 0.8 -
  project.preOpeningMarketing -
  project.rentHalfYear;
const diamondMonthlyConsumption = (membership.preOpeningDiamond * membership.diamondStoredValue) / months.length;

let cashBalance = 0;
let deferredBalance = 0;
let goldMembers = membership.preOpeningGold;
const accountingProfitByYear: Record<number, number> = {};
const renewalEventsByMonth = new Map<number, number>();

function scheduleRenewalEvents(sourceMonthIndex: number, amount: number) {
  const windowLength = membership.renewalEndOffset - membership.renewalStartOffset + 1;
  const monthlyAmount = amount / windowLength;
  for (let offset = membership.renewalStartOffset; offset <= membership.renewalEndOffset; offset += 1) {
    const targetMonth = sourceMonthIndex + offset;
    if (targetMonth >= 0 && targetMonth < months.length) {
      renewalEventsByMonth.set(targetMonth, (renewalEventsByMonth.get(targetMonth) ?? 0) + monthlyAmount);
    }
  }
}

function newGoldForMonth(monthIndex: number, currentGold: number) {
  if (currentGold >= membership.stableGoldTarget) return 0;
  if (monthIndex === 0) return 0;
  const planned = monthIndex <= 6 ? membership.firstSixMonthsAdds : membership.laterMonthlyAdds;
  return Math.min(planned, membership.stableGoldTarget - currentGold);
}

function rentPaymentForMonth(index: number) {
  return index === 0 || (index >= 7 && (index - 7) % 6 === 0) ? project.rentHalfYear : 0;
}

function dividendPaymentForMonth(month: Month) {
  if (!((month.year === 2027 || month.year === 2028) && month.monthNumber === 11)) return 0;
  return Math.max(0, (accountingProfitByYear[month.year] ?? 0) * operating.dividendProfitShare);
}

export const monthlyForecast = months.map((month) => {
  const isOpeningCashMonth = month.index === 0;
  const isOperatingMonth = month.index > 0;
  const court = isOperatingMonth ? monthlyCourtRevenue(month) : { covered: 0, outdoor: 0, total: 0 };
  const newGold = newGoldForMonth(month.index, goldMembers);
  goldMembers += newGold;

  const initialGoldStoredValue = month.index === 0 ? membership.preOpeningGold * membership.goldStoredValue : 0;
  const diamondStoredValue = month.index === 0 ? membership.preOpeningDiamond * membership.diamondStoredValue : 0;
  const investorCapitalCash = isOpeningCashMonth ? project.investorCapital : 0;
  const preOpeningMarketingPayment = isOpeningCashMonth ? project.preOpeningMarketing : 0;
  const firstStoredCash = initialGoldStoredValue + newGold * membership.goldStoredValue;
  let renewalStoredValue = renewalEventsByMonth.get(month.index) ?? 0;
  const publicCourtCash = court.total * membership.publicBookingShare;
  const memberCourtConsumption = court.total * membership.memberBookingShare;
  const courtBookingRevenue = court.total;
  const coachingRevenue = isOperatingMonth ? coachingSummary.monthlyRevenue : 0;
  const eventRevenue = isOperatingMonth ? eventSummary.monthlyRevenue : 0;
  const publicEventCash = eventRevenue * 0.2;
  const memberEventConsumptionFromStoredValue = eventRevenue * 0.8;
  const coachingConsumptionFromStoredValue = coachingRevenue;
  const goldMemberStoredValueConsumption =
    memberCourtConsumption + coachingConsumptionFromStoredValue + memberEventConsumptionFromStoredValue;
  const memberStoredValueConsumption = goldMemberStoredValueConsumption + diamondMonthlyConsumption;
  // If scheduled renewals lag behind actual member consumption, members top up enough to keep roughly one month
  // of stored-value liability on hand. This avoids negative deferred revenue without allowing it to compound without limit.
  // This keeps the model realistic without treating coaching or member consumption as new cash twice.
  const targetDeferredReserve = goldMemberStoredValueConsumption;
  const balanceProtectionRenewal = Math.max(
    0,
    targetDeferredReserve +
      goldMemberStoredValueConsumption -
      (deferredBalance + firstStoredCash + renewalStoredValue + diamondStoredValue),
  );
  renewalStoredValue += balanceProtectionRenewal;
  const storedValueCash = firstStoredCash + renewalStoredValue;
  const scheduledRenewalBase = firstStoredCash + renewalStoredValue - balanceProtectionRenewal;
  if (scheduledRenewalBase > 0) scheduleRenewalEvents(month.index, scheduledRenewalBase);
  const recognizedRevenue = courtBookingRevenue + coachingRevenue + eventRevenue;
  const tax = recognizedRevenue * operating.taxRate;
  const rentPayment = rentPaymentForMonth(month.index);
  const capexPayment = month.index === 0 ? project.capex * 0.8 : month.index === 7 ? project.capex * 0.2 : 0;
  const accountingProfit =
    recognizedRevenue -
    (isOperatingMonth ? operating.monthlyFixedWithoutRentCash : 0) -
    (isOperatingMonth ? monthlyCoachingVariablePayout : 0) -
    (isOperatingMonth ? project.rentMonthly : 0) -
    tax;

  accountingProfitByYear[month.year] = (accountingProfitByYear[month.year] ?? 0) + accountingProfit;
  const dividendPayment = dividendPaymentForMonth(month);

  const cashIn = investorCapitalCash + publicCourtCash + publicEventCash + storedValueCash + diamondStoredValue;
  const cashOut =
    (isOperatingMonth ? operating.monthlyFixedWithoutRentCash : 0) +
    (isOperatingMonth ? monthlyCoachingVariablePayout : 0) +
    tax +
    preOpeningMarketingPayment +
    rentPayment +
    capexPayment +
    dividendPayment;
  const netCashflow = cashIn - cashOut;

  cashBalance += netCashflow;
  deferredBalance += storedValueCash + diamondStoredValue - memberStoredValueConsumption;

  return {
    ...month,
    goldMembers,
    newGold,
    investorCapitalCash,
    diamondStoredValue,
    diamondMonthlyConsumption,
    firstStoredCash,
    renewalStoredValue,
    balanceProtectionRenewal,
    storedValueCash,
    coveredCourtRevenue: court.covered,
    outdoorCourtRevenue: court.outdoor,
    courtBookingRevenue,
    publicCourtCash,
    memberCourtConsumption,
    coachingRevenue,
    coachingConsumptionFromStoredValue,
    eventRevenue,
    publicEventCash,
    memberEventConsumptionFromStoredValue,
    goldMemberStoredValueConsumption,
    memberStoredValueConsumption,
    recognizedRevenue,
    tax,
    preOpeningMarketingPayment,
    rentPayment,
    capexPayment,
    dividendPayment,
    accountingProfit,
    netCashflow,
    cashBalance,
    deferredBalance,
    riskMonth: netCashflow < 0 || month.monthNumber === courtModel.rainySeasonMonth,
    milestones: [
      month.index === 0 ? 'Opening / 开业' : '',
      rentPayment > 0 ? 'Rent Payment / 租金支付' : '',
      month.monthNumber === courtModel.rainySeasonMonth ? 'Rainy Season / 梅雨季' : '',
      capexPayment > 0 ? 'CapEx Settlement / 工程尾款' : '',
      dividendPayment > 0 ? 'Dividend Distribution / 分红' : '',
    ].filter(Boolean),
  };
});

function sum<T>(items: T[], selector: (item: T) => number) {
  return items.reduce((total, item) => total + selector(item), 0);
}

export const quarterlyForecast = Array.from(new Set(monthlyForecast.map((item) => item.quarterLabel))).map((quarter) => {
  const monthsInQuarter = monthlyForecast.filter((item) => item.quarterLabel === quarter);
  const last = monthsInQuarter[monthsInQuarter.length - 1];
  return {
    quarter,
    courtBookingRevenue: sum(monthsInQuarter, (item) => item.courtBookingRevenue),
    coachingRevenue: sum(monthsInQuarter, (item) => item.coachingRevenue),
    eventRevenue: sum(monthsInQuarter, (item) => item.eventRevenue),
    recognizedRevenue: sum(monthsInQuarter, (item) => item.recognizedRevenue),
    firstStoredCash: sum(monthsInQuarter, (item) => item.firstStoredCash),
    renewalStoredValue: sum(monthsInQuarter, (item) => item.renewalStoredValue),
    storedValueCash: sum(monthsInQuarter, (item) => item.storedValueCash),
    diamondStoredValue: sum(monthsInQuarter, (item) => item.diamondStoredValue),
    recognizedFromStored: sum(monthsInQuarter, (item) => item.memberStoredValueConsumption),
    netCashflow: sum(monthsInQuarter, (item) => item.netCashflow),
    accountingProfit: sum(monthsInQuarter, (item) => item.accountingProfit),
    cashBalance: last.cashBalance,
    deferredBalance: last.deferredBalance,
    dividendPayment: sum(monthsInQuarter, (item) => item.dividendPayment),
    rentPayment: sum(monthsInQuarter, (item) => item.rentPayment),
    capexPayment: sum(monthsInQuarter, (item) => item.capexPayment),
    goldMembers: last.goldMembers,
    milestones: monthsInQuarter.flatMap((item) => item.milestones),
    riskQuarter: monthsInQuarter.some((item) => item.riskMonth),
  };
});

const stableMonths = monthlyForecast.slice(12, 24);
const stableAnnualRecognizedRevenue = sum(stableMonths, (item) => item.recognizedRevenue);
const stableAnnualGoldStoredValue = sum(monthlyForecast.slice(24, 36), (item) => item.storedValueCash);
const stableAnnualMemberStoredValueConsumption = sum(monthlyForecast.slice(24, 36), (item) => item.memberStoredValueConsumption);

// Stability sense check:
// 200 Gold members * ¥6,000 * 12 / 9 ≈ ¥1.6M annual renewal cashflow.
// Member stored-value consumption should land in a similar range, keeping deferred revenue from compounding without limit.
export const modelStabilityCheck = {
  stableAnnualGoldStoredValue,
  stableAnnualMemberStoredValueConsumption,
};

export const heroKpis = [
  { label: 'Initial Investment / 初始投资', value: project.investorCapital, display: '¥1.0M' },
  { label: 'Pre-opening Stored Value / 开业前储值', value: preOpeningStoredValue, display: compactCurrency(preOpeningStoredValue) },
  { label: 'Stable Gold Members / 稳定Gold会员', value: membership.stableGoldTarget, display: '200' },
  { label: 'Annual Recognized Revenue / 稳定期确认收入', value: stableAnnualRecognizedRevenue, display: '~¥2.0M' },
  { label: 'Coaching Net Contribution / 私教净贡献', value: coachingSummary.annualNetContribution, display: '~¥320K' },
  { label: 'Annual Member Event Revenue / 会员活动收入', value: eventSummary.annualRevenue, display: '~¥180K' },
];

export const revenueStructure = [
  { name: 'Court Booking / 订场', value: sum(stableMonths, (item) => item.courtBookingRevenue), color: colors.covered },
  { name: 'Coaching / 私教', value: sum(stableMonths, (item) => item.coachingRevenue), color: colors.coaching },
  { name: 'Member Events / 会员活动', value: sum(stableMonths, (item) => item.eventRevenue), color: colors.event },
];

export const utilizationHeatmap = [
  { type: 'Covered / 顶棚', slot: 'Weekday Day / 工作日白天', value: 10 },
  { type: 'Covered / 顶棚', slot: 'Weekday Evening / 工作日晚场', value: 50 },
  { type: 'Covered / 顶棚', slot: 'Weekend Day / 周末白天', value: 20 },
  { type: 'Covered / 顶棚', slot: 'Weekend Evening / 周末晚场', value: 60 },
  { type: 'Outdoor / 室外', slot: 'Weekday Day / 工作日白天', value: 15 },
  { type: 'Outdoor / 室外', slot: 'Weekday Evening / 工作日晚场', value: 55 },
  { type: 'Outdoor / 室外', slot: 'Weekend Day / 周末白天', value: 25 },
  { type: 'Outdoor / 室外', slot: 'Weekend Evening / 周末晚场', value: 65 },
];

export const courtContribution = [
  { name: 'Covered / 顶棚', value: sum(monthlyForecast, (item) => item.coveredCourtRevenue), color: colors.covered },
  { name: 'Outdoor / 室外', value: sum(monthlyForecast, (item) => item.outdoorCourtRevenue), color: colors.outdoor },
];

export const coachingCapacity = coachingSummary.rows.map((row) => ({
  name: row.name,
  capacity: row.load * 100,
  lessons: Math.round(row.lessons),
}));

export const coachingRevenueBridge = [
  { name: 'Confirmed Revenue / 确认收入', value: coachingSummary.annualRevenue, fill: colors.coaching },
  { name: 'Gross Contribution / 毛贡献', value: coachingSummary.monthlyGrossContribution * 12, fill: colors.highlight },
  { name: 'Net Contribution / 净贡献', value: coachingSummary.annualNetContribution, fill: colors.risk },
];

export const membershipHighlights = [
  { label: 'Pre-opening Gold / 开业前Gold', value: String(membership.preOpeningGold) },
  { label: 'Stable target / 稳定目标', value: String(membership.stableGoldTarget) },
  { label: 'Diamond retained / 保留Diamond', value: `${membership.preOpeningDiamond} × ${compactCurrency(membership.diamondStoredValue)}` },
];

export const coachingMetricCards = [
  { label: 'Confirmed revenue / 确认收入', value: compactCurrency(coachingSummary.annualRevenue) },
  { label: 'Net contribution / 净贡献', value: `${compactCurrency(coachingSummary.annualNetContribution)} · 31-32万` },
  { label: 'Monthly gross contribution / 月毛贡献', value: compactCurrency(coachingSummary.monthlyGrossContribution) },
  { label: 'Fixed salary / 固定工资', value: compactCurrency(coachingSummary.monthlyFixedSalary) },
];

export const storedValueQuarterlyData = quarterlyForecast.map((quarter) => ({
  quarter: quarter.quarter,
  firstPurchase: quarter.firstStoredCash,
  renewal: quarter.renewalStoredValue,
}));

export const deferredRevenueData = quarterlyForecast.map((quarter) => ({
  quarter: quarter.quarter,
  storedCashIn: quarter.storedValueCash + quarter.diamondStoredValue,
  recognizedFromStored: quarter.recognizedFromStored,
  deferredBalance: quarter.deferredBalance,
}));

export const cashVsDeferred = quarterlyForecast.map((quarter) => ({
  quarter: quarter.quarter,
  cash: quarter.cashBalance,
  deferred: quarter.deferredBalance,
}));

export const riskMatrix = [
  {
    risk: 'Gold Growth / Gold增长速度',
    exposure: 'Medium / 中',
    signal: 'The model reaches 200 Gold members through early +8/month growth, then +5/month until stable.',
    cnSignal: '模型依赖前6个月每月新增8人，之后每月新增5人，直到稳定在200人。',
    color: colors.event,
  },
  {
    risk: 'Covered Court Utilization / 顶棚晚场利用率',
    exposure: 'High / 高',
    signal: 'Covered evening hours carry premium pricing and protect the model during rainy periods.',
    cnSignal: '顶棚晚场承担更高单价，也是梅雨季现金流稳定性的关键。',
    color: colors.risk,
  },
  {
    risk: 'Deferred Revenue Pressure / 递延收入压力',
    exposure: 'Medium / 中',
    signal: 'Stored value improves liquidity, while creating future court-service obligations.',
    cnSignal: '储值提升了现金流，也形成了未来履约义务。',
    color: colors.outdoor,
  },
];

export const milestoneDots = monthlyForecast
  .filter((item) => item.milestones.length > 0)
  .map((item) => ({
    label: item.label,
    y: item.cashBalance,
    milestones: item.milestones,
    color: item.dividendPayment > 0 || item.capexPayment > 0 ? colors.risk : colors.event,
  }));

export const summary = {
  preOpeningStoredValue,
  preOpeningCash,
  stableAnnualRecognizedRevenue,
  annualMemberEventRevenue: eventSummary.annualRevenue,
  firstYearRecognizedRevenue: sum(monthlyForecast.slice(0, 12), (item) => item.recognizedRevenue),
  threeYearRecognizedRevenue: sum(monthlyForecast, (item) => item.recognizedRevenue),
  endingCashBalance: monthlyForecast[monthlyForecast.length - 1].cashBalance,
  endingDeferredBalance: monthlyForecast[monthlyForecast.length - 1].deferredBalance,
  totalDividendPaid: sum(monthlyForecast, (item) => item.dividendPayment),
};
