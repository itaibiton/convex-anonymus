"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsWidget() {
  const stats = [
    { label: 'Total Confessions', value: '12.4K', change: '+8.2%' },
    { label: 'Active Users', value: '2.1K', change: '+12.4%' },
    { label: 'This Week', value: '284', change: '+23.1%' },
  ];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-2xl">Board Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <div className="twitter-muted text-base">{stat.label}</div>
              <div className="font-bold text-foreground text-xl">{stat.value}</div>
            </div>
            <div className="text-emerald-500 text-base font-semibold">
              {stat.change}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}