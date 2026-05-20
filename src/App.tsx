import { motion, useInView, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { ArrowDown, Calendar, CircleDollarSign, Layers, MapPin, ShieldAlert, TrendingUp } from 'lucide-react';
import { ReactNode, useEffect, useRef } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  cashVsDeferred,
  coachingCapacity,
  coachingMetricCards,
  coachingRevenueBridge,
  coachingSummary,
  colors,
  compactCurrency,
  courtContribution,
  deferredRevenueData,
  formatCurrency,
  heroKpis,
  membership,
  membershipHighlights,
  milestoneDots,
  monthlyForecast,
  project,
  quarterlyForecast,
  revenueStructure,
  riskMatrix,
  storedValueQuarterlyData,
  summary,
  utilizationHeatmap,
} from './data';

const fade: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString('en-US')}${suffix}`;
    });
  }, [prefix, spring, suffix]);

  return <span ref={ref}>0</span>;
}

function Section({
  eyebrow,
  title,
  children,
  className = '',
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      className={`mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24 ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={fade}
    >
      <div className="mb-9">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#B7FF6A]">{eyebrow}</p>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-normal text-[#F5F3EE] md:text-5xl">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card p-5 sm:p-6 ${className}`}>{children}</div>;
}

function ChartCard({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[#F5F3EE]">{title}</h3>
        {note ? <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A7ADB7]">{note}</p> : null}
      </div>
      <div className="chart-shell">{children}</div>
    </Card>
  );
}

const tooltipStyle = {
  background: '#151922',
  border: '1px solid rgba(245,243,238,.12)',
  borderRadius: 16,
  color: colors.text,
};

const asNumber = (value: unknown) => Number(value ?? 0);
const currencyTooltip = (value: unknown) => formatCurrency(asNumber(value));
const compactLabel = (value: unknown) => compactCurrency(asNumber(value));
const percentTooltip = (value: unknown) => `${asNumber(value)}%`;
const percentLabel = (value: unknown) => `${asNumber(value)}%`;

function Hero() {
  return (
    <header className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-5 py-8 sm:px-8">
      <nav className="flex items-center justify-between text-sm text-[#A7ADB7]">
        <span className="font-medium text-[#F5F3EE]">Evolution Tennis Club / 进界网球俱乐部</span>
        <span>{project.city}</span>
      </nav>

      <motion.div
        className="grid gap-10 pb-10 pt-20 lg:grid-cols-[1.18fr_.82fr] lg:items-end"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#B7FF6A]">
            36-Month Financial Forecast / 36个月财务预测
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-normal text-[#F5F3EE] sm:text-7xl lg:text-8xl">
            Evolution Tennis Club
            <span className="mt-4 block text-[#A7ADB7]">进界网球俱乐部</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#A7ADB7]">
            A premium operating model for an urban tennis club in Changzhou. 用克制的数据展示场地经济、会员储值、私教贡献与长期现金流。
          </p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-[#A7ADB7]">
            <span className="subtle-card inline-flex items-center gap-2 px-4 py-3"><MapPin size={16} /> Changzhou / 常州</span>
            <span className="subtle-card inline-flex items-center gap-2 px-4 py-3"><Calendar size={16} /> Opens Oct 1, 2026 / 2026年10月开业</span>
            <span className="subtle-card inline-flex items-center gap-2 px-4 py-3"><Layers size={16} /> 2 Covered + 4 Outdoor / 2片顶棚 + 4片室外</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {heroKpis.map((kpi, index) => (
            <Card key={kpi.label} className={index === 0 ? 'col-span-2' : ''}>
              <p className="text-xs uppercase tracking-[0.18em] text-[#A7ADB7]">{kpi.label}</p>
              <p className="mt-4 text-2xl font-semibold text-[#F5F3EE] sm:text-3xl">
                {kpi.display === '200' ? <AnimatedNumber value={kpi.value} /> : kpi.display}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>

      <a className="mb-3 inline-flex w-fit items-center gap-2 text-sm text-[#A7ADB7]" href="#model">
        Scroll forecast / 查看模型 <ArrowDown size={16} />
      </a>
    </header>
  );
}

function ModelSection() {
  const stats = [
    { label: 'Pre-opening cash / 开业前可用现金', value: compactCurrency(summary.preOpeningCash) },
    { label: '36-month recognized revenue / 36个月确认收入', value: compactCurrency(summary.threeYearRecognizedRevenue) },
    { label: 'Total dividends paid / 累计分红', value: compactCurrency(summary.totalDividendPaid) },
    { label: 'Ending deferred revenue / 期末递延收入', value: compactCurrency(summary.endingDeferredBalance) },
  ];

  return (
    <Section eyebrow="02 / Operating Logic" title="The Model / 项目模型" className="scroll-mt-6">
      <div id="model" className="grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <p className="text-sm leading-6 text-[#A7ADB7]">{item.label}</p>
            <p className="mt-5 text-3xl font-semibold text-[#F5F3EE]">{item.value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <ChartCard
          title="Revenue Structure / 收入结构"
          note="Stable-period recognized revenue is split into three operating blocks, not stored-value cash."
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={revenueStructure} dataKey="value" nameKey="name" innerRadius={64} outerRadius={105} paddingAngle={3}>
                {revenueStructure.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ color: colors.muted, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <Card className="flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[#B7FF6A]">Core thesis / 核心逻辑</p>
            <p className="mt-6 max-w-2xl text-3xl font-semibold leading-tight text-[#F5F3EE]">
              Stored value improves liquidity, while creating future obligations.
            </p>
            <p className="mt-4 text-lg leading-8 text-[#A7ADB7]">储值提升了现金流，也形成了未来履约义务。</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {['Court Booking / 订场', 'Coaching / 私教', 'Member Events / 会员活动'].map((item) => (
              <div key={item} className="subtle-card px-4 py-4 text-sm text-[#A7ADB7]">{item}</div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function CourtsSection() {
  const heatmapColumns = utilizationHeatmap[0]?.values.map((item) => item.slot) ?? [];
  const heatmapCellStyle = (value: number) => ({
    backgroundColor: `rgba(183,255,106,${0.035 + (value / 100) * 0.28})`,
    borderColor: value >= 50 ? 'rgba(183,255,106,0.22)' : 'rgba(245,243,238,0.08)',
  });

  return (
    <Section eyebrow="03 / Capacity" title="Courts / 场地模型">
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Court Utilization Heatmap / 场地利用率热力图"
          note="Covered evening utilization is the key operating lever. 顶棚晚场利用率是核心变量。"
        >
          <div className="flex h-full items-center">
            <div className="w-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.018]">
              <div className="grid grid-cols-[minmax(92px,1.15fr)_repeat(4,minmax(64px,1fr))] border-b border-white/10 bg-white/[0.018]">
                <div className="px-4 py-3" />
                {heatmapColumns.map((column) => (
                  <div key={column} className="px-2 py-3 text-center text-xs font-medium text-[#A7ADB7]">
                    {column}
                  </div>
                ))}
              </div>
              {utilizationHeatmap.map((row) => (
                <div key={row.row} className="grid grid-cols-[minmax(92px,1.15fr)_repeat(4,minmax(64px,1fr))] border-b border-white/[0.06] last:border-b-0">
                  <div className="flex items-center px-4 py-4 text-sm font-medium text-[#F5F3EE]">{row.row}</div>
                  {row.values.map((cell) => (
                    <div key={`${row.row}-${cell.slot}`} className="p-1.5">
                      <div
                        className="flex min-h-16 items-center justify-center rounded-2xl border text-2xl font-semibold text-[#F5F3EE]"
                        style={heatmapCellStyle(cell.value)}
                      >
                        <span className={cell.value >= 50 ? 'text-[#B7FF6A]' : 'text-[#D8DDD2]'}>{cell.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
        <ChartCard title="Covered vs Outdoor Revenue / 顶棚与室外收入贡献" note="36-month court booking contribution by court type.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courtContribution} layout="vertical" margin={{ left: 20, right: 34 }}>
              <CartesianGrid stroke="rgba(255,255,255,.06)" horizontal={false} />
              <XAxis type="number" tickFormatter={compactCurrency} stroke={colors.muted} />
              <YAxis type="category" dataKey="name" stroke={colors.muted} width={110} />
              <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[0, 14, 14, 0]}>
                {courtContribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                <LabelList dataKey="value" position="right" formatter={compactLabel} fill={colors.text} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </Section>
  );
}

function MembershipSection() {
  return (
    <Section eyebrow="04 / Stored Value" title="Membership / 会员体系">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <ChartCard
          title="Gold Member Growth / Gold会员增长"
          note={`Growth starts at ${membership.preOpeningGold} Gold members, then reaches the stable target of ${membership.stableGoldTarget}.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyForecast} margin={{ top: 18, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,.06)" />
              <XAxis dataKey="label" stroke={colors.muted} interval={2} />
              <YAxis domain={[50, 210]} stroke={colors.muted} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="goldMembers" name="Gold Members / Gold会员" stroke={colors.highlight} strokeWidth={3} dot={false} />
              <ReferenceLine y={membership.stableGoldTarget} stroke="rgba(183,255,106,.45)" strokeDasharray="4 6" label={{ value: `Stable ${membership.stableGoldTarget} / 稳定${membership.stableGoldTarget}`, fill: colors.muted }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard
          title="Stored Value Renewal / 储值与续储"
          note="Gold members renew stored value periodically as their balances are consumed through court booking, coaching and member events. Gold会员会随着订场、私教和会员活动消费持续消耗余额，并周期性续储。"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={storedValueQuarterlyData} margin={{ top: 18, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,.06)" />
              <XAxis dataKey="quarter" stroke={colors.muted} tick={{ fontSize: 11 }} />
              <YAxis stroke={colors.muted} tickFormatter={compactCurrency} />
              <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: colors.muted, fontSize: 12 }} />
              <Bar dataKey="firstPurchase" name="First Purchase / 首次储值" stackId="stored" fill={colors.storedFirst} radius={[0, 0, 0, 0]} />
              <Bar dataKey="renewal" name="Renewal / 续储" stackId="stored" fill={colors.storedRenewal} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {membershipHighlights.map(({ label, value }) => (
          <Card key={label}>
            <p className="text-sm text-[#A7ADB7]">{label}</p>
            <p className="mt-4 text-3xl font-semibold text-[#F5F3EE]">{value}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function CoachingSection() {
  return (
    <Section eyebrow="05 / Lessons" title="Coaching / 私教模型">
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Coaching Capacity / 私教产能" note="No part-time junior coach is included in the base model. 中性模型不纳入兼职初级教练。">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={coachingCapacity} margin={{ top: 20, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,.06)" />
              <XAxis dataKey="name" stroke={colors.muted} tick={{ fontSize: 11 }} />
              <YAxis stroke={colors.muted} tickFormatter={(value) => `${value}%`} />
              <Tooltip contentStyle={tooltipStyle} formatter={percentTooltip} />
              <Bar dataKey="capacity" fill={colors.highlight} radius={[14, 14, 0, 0]}>
                <LabelList dataKey="capacity" position="top" formatter={percentLabel} fill={colors.text} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard
          title="Coaching Revenue vs Net Contribution / 私教收入与净贡献"
          note={`Annual confirmed coaching revenue is about ${compactCurrency(coachingSummary.annualRevenue)}; annual net contribution is about ${compactCurrency(coachingSummary.annualNetContribution)}.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={coachingRevenueBridge} margin={{ top: 20, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,.06)" />
              <XAxis dataKey="name" stroke={colors.muted} tick={{ fontSize: 11 }} />
              <YAxis stroke={colors.muted} tickFormatter={compactCurrency} />
              <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[14, 14, 0, 0]}>
                {coachingRevenueBridge.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                <LabelList dataKey="value" position="top" formatter={compactLabel} fill={colors.text} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {coachingMetricCards.map(({ label, value }) => (
          <Card key={label}>
            <p className="text-sm text-[#A7ADB7]">{label}</p>
            <p className="mt-4 text-2xl font-semibold text-[#F5F3EE]">{value}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ForecastSection() {
  return (
    <Section eyebrow="06 / 36-Month View" title="Forecast / 财务预测">
      <div className="space-y-5">
        <ChartCard title="36-Month Cash Balance / 36个月现金余额" note="Opening, rent, rainy season, CapEx settlement, and dividend distributions are marked directly on the line.">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyForecast} margin={{ top: 18, right: 34, left: 0, bottom: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,.06)" />
              <XAxis dataKey="label" stroke={colors.muted} interval={2} tick={{ fontSize: 11 }} />
              <YAxis stroke={colors.muted} tickFormatter={compactCurrency} />
              <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="cashBalance" name="Cash Balance / 现金余额" stroke={colors.highlight} strokeWidth={3} dot={false} />
              {milestoneDots.map((dot) => (
                <ReferenceDot
                  key={`${dot.label}-${dot.milestones.join(',')}`}
                  x={dot.label}
                  y={dot.y}
                  r={4}
                  fill={dot.color}
                  stroke="none"
                  label={{ value: dot.milestones[0], fill: colors.muted, fontSize: 10, position: 'top' }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <div className="grid gap-5 lg:grid-cols-2">
          <ChartCard title="Quarterly Net Cashflow / 季度净现金流" note="Risk quarters use soft orange, including heavy payment or dividend periods.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyForecast} margin={{ top: 18, right: 24, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,.06)" />
                <XAxis dataKey="quarter" stroke={colors.muted} tick={{ fontSize: 11 }} />
                <YAxis stroke={colors.muted} tickFormatter={compactCurrency} />
                <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
                <Bar dataKey="netCashflow" name="Net Cashflow / 净现金流" radius={[10, 10, 0, 0]}>
                  {quarterlyForecast.map((entry) => (
                    <Cell key={entry.quarter} fill={entry.netCashflow < 0 || entry.riskQuarter ? colors.risk : colors.highlight} opacity={entry.netCashflow < 0 ? 0.9 : 0.72} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Quarterly Recognized Revenue / 季度确认收入" note="Revenue is recognized from court booking, coaching, and member events. 储值不直接等同于收入。">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyForecast} margin={{ top: 18, right: 24, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,.06)" />
                <XAxis dataKey="quarter" stroke={colors.muted} tick={{ fontSize: 11 }} />
                <YAxis stroke={colors.muted} tickFormatter={compactCurrency} />
                <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: colors.muted, fontSize: 12 }} />
                <Bar dataKey="courtBookingRevenue" name="Court Booking / 订场" stackId="revenue" fill={colors.covered} />
                <Bar dataKey="coachingRevenue" name="Coaching / 私教" stackId="revenue" fill={colors.coaching} />
                <Bar dataKey="eventRevenue" name="Member Events / 会员活动" stackId="revenue" fill={colors.event} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </Section>
  );
}

function CashflowSection() {
  return (
    <Section eyebrow="07 / Liquidity" title="Cashflow / 现金流">
      <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div className="sticky top-8">
          <Card>
            <p className="text-sm uppercase tracking-[0.22em] text-[#B7FF6A]">Deferred revenue / 递延收入</p>
            <p className="mt-6 text-3xl font-semibold leading-tight text-[#F5F3EE]">
              Stored value improves liquidity, while creating future obligations.
            </p>
            <p className="mt-4 text-lg leading-8 text-[#A7ADB7]">储值提升了现金流，也形成了未来履约义务。</p>
            <div className="mt-8 space-y-4 text-sm leading-6 text-[#A7ADB7]">
              <p>Member discounts reduce actual stored value consumption relative to recognized revenue. 会员折扣会降低实际储值消耗，因此实际储值扣减低于确认收入。</p>
              <p>Tax is calculated on recognized sales, not stored-value cash. 税费按确认销售额计算，而不是按储值现金流计算。</p>
              <p>Rent is deducted only at payment nodes. 房租只在支付节点扣除。</p>
              <p>Dividend distributions reduce cash balance at the end of 2027 and 2028. 分红在2027年底与2028年底扣减现金。</p>
            </div>
          </Card>
        </div>
        <div className="space-y-5">
          <ChartCard title="Deferred Revenue Dynamics / 递延收入动态" note="Member discounts reduce actual stored value consumption relative to recognized revenue. 会员折扣会降低实际储值消耗，因此实际储值扣减低于确认收入。">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={deferredRevenueData} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,.06)" />
                <XAxis dataKey="quarter" stroke={colors.muted} tick={{ fontSize: 11 }} />
                <YAxis stroke={colors.muted} tickFormatter={compactCurrency} />
                <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: colors.muted, fontSize: 12 }} />
                <Bar dataKey="storedCashIn" name="Stored Cash In / 储值现金流入" fill={colors.highlight} radius={[10, 10, 0, 0]} />
                <Bar dataKey="recognizedFromStored" name="Stored Value Consumption / 实际储值消耗" fill={colors.outdoor} radius={[10, 10, 0, 0]} />
                <Line dataKey="deferredBalance" name="Deferred Balance / 递延余额" stroke={colors.risk} strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
          <div className="grid gap-5 lg:grid-cols-2">
            <ChartCard
              title="Stored Value Renewal / 储值续储"
              note="Gold renewals sustain cashflow while discounts make actual stored value consumption lower than recognized revenue. Gold周期性续储维持现金流，会员折扣使实际储值扣减低于确认收入。"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={storedValueQuarterlyData} margin={{ top: 18, right: 24, left: 0, bottom: 8 }}>
                  <CartesianGrid stroke="rgba(255,255,255,.06)" />
                  <XAxis dataKey="quarter" stroke={colors.muted} tick={{ fontSize: 11 }} />
                  <YAxis stroke={colors.muted} tickFormatter={compactCurrency} />
                  <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ color: colors.muted, fontSize: 12 }} />
                  <Bar dataKey="firstPurchase" name="First Purchase / 首次储值" fill={colors.storedFirst} radius={[10, 10, 0, 0]} />
                  <Bar dataKey="renewal" name="Renewal / 续储" fill={colors.storedRenewal} radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Cash vs Deferred Revenue / 现金与递延收入">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashVsDeferred} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
                  <CartesianGrid stroke="rgba(255,255,255,.06)" />
                  <XAxis dataKey="quarter" stroke={colors.muted} tick={{ fontSize: 11 }} />
                  <YAxis stroke={colors.muted} tickFormatter={compactCurrency} />
                  <Tooltip formatter={currencyTooltip} contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ color: colors.muted, fontSize: 12 }} />
                  <Area type="monotone" dataKey="deferred" name="Deferred Revenue / 递延收入" stroke={colors.deferred} fill="rgba(255,139,106,.16)" />
                  <Area type="monotone" dataKey="cash" name="Cash Balance / 现金余额" stroke={colors.cash} fill="rgba(183,255,106,.14)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </div>
    </Section>
  );
}

function RisksSection() {
  return (
    <Section eyebrow="08 / Reality" title="Risks / 风险分析">
      <div className="grid gap-5 md:grid-cols-3">
        {riskMatrix.map((risk) => (
          <Card key={risk.risk}>
            <div className="mb-8 flex items-center justify-between">
              <ShieldAlert color={risk.color} size={22} />
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#A7ADB7]">{risk.exposure}</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#F5F3EE]">{risk.risk}</h3>
            <p className="mt-5 text-sm leading-6 text-[#A7ADB7]">{risk.signal}</p>
            <p className="mt-3 text-sm leading-6 text-[#A7ADB7]">{risk.cnSignal}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ExpansionSection() {
  const phases = [
    ['Phase 01 / 第一阶段', 'Stabilize membership / 稳定会员', `Reach ${membership.stableGoldTarget} Gold members while keeping service quality and court availability controlled.`],
    ['Phase 02 / 第二阶段', 'Improve covered utilization / 提升顶棚利用率', 'Use evening demand, rainy-season reliability, and member events to lift premium court hours.'],
    ['Phase 03 / 第三阶段', 'Repeatable operations / 可复制运营', 'Turn the Changzhou model into a disciplined club playbook before considering a second site.'],
  ];

  return (
    <Section eyebrow="09 / Growth" title="Expansion / 增长路径">
      <div className="grid gap-5 lg:grid-cols-3">
        {phases.map(([phase, title, text]) => (
          <Card key={phase}>
            <p className="text-sm uppercase tracking-[0.22em] text-[#B7FF6A]">{phase}</p>
            <h3 className="mt-6 text-2xl font-semibold text-[#F5F3EE]">{title}</h3>
            <p className="mt-5 text-sm leading-6 text-[#A7ADB7]">{text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function VisionSection() {
  return (
    <Section eyebrow="10 / Compounding" title="Vision / 长期主义" className="pb-12">
      <Card className="min-h-[58vh] p-8 sm:p-12">
        <div className="flex h-full min-h-[48vh] flex-col justify-between">
          <p className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-normal text-[#F5F3EE] md:text-7xl">
            A long-term urban tennis club,
            <br />
            built around people,
            <br />
            not transactions.
          </p>
          <p className="mt-10 max-w-3xl text-3xl font-semibold leading-tight text-[#A7ADB7] md:text-5xl">
            长期主义的城市网球 Club，
            <br />
            围绕人与关系，
            <br />
            而不只是交易。
          </p>
          <div className="mt-16 flex flex-col gap-2 text-[#A7ADB7]">
            <p className="text-xl font-semibold text-[#F5F3EE]">Evolution Tennis Club</p>
            <p>进界网球俱乐部</p>
            <p>Changzhou, China</p>
          </div>
        </div>
      </Card>
    </Section>
  );
}

export default function App() {
  return (
    <main className="relative overflow-hidden bg-[#0F1115] text-[#F5F3EE]">
      <div className="noise" />
      <Hero />
      <ModelSection />
      <CourtsSection />
      <MembershipSection />
      <CoachingSection />
      <ForecastSection />
      <CashflowSection />
      <RisksSection />
      <ExpansionSection />
      <VisionSection />
      <footer className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-8 text-xs text-[#A7ADB7] sm:px-8">
        <span>Evolution Tennis Club / 进界网球俱乐部</span>
        <span className="inline-flex items-center gap-2"><CircleDollarSign size={14} /> Financial forecast / 财务预测</span>
        <span className="hidden items-center gap-2 sm:inline-flex"><TrendingUp size={14} /> 2026-2029</span>
      </footer>
    </main>
  );
}
