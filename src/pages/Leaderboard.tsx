import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Search, Medal, Award, Crown, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Contributor {
  rank: number;
  name: string;
  contributions: number;
  language: string;
  avatar?: string;
}

const mockContributors: Contributor[] = [
  { rank: 1, name: 'Priya Sharma', contributions: 2847, language: 'Hindi' },
  { rank: 2, name: 'Ravi Kumar', contributions: 2563, language: 'Telugu' },
  { rank: 3, name: 'Ananya Reddy', contributions: 2341, language: 'Telugu' },
  { rank: 4, name: 'Vikram Singh', contributions: 2198, language: 'Hindi' },
  { rank: 5, name: 'Meera Patel', contributions: 1987, language: 'English' },
  { rank: 6, name: 'Arjun Nair', contributions: 1856, language: 'Malayalam' },
  { rank: 7, name: 'Deepa Iyer', contributions: 1734, language: 'Tamil' },
  { rank: 8, name: 'Rahul Verma', contributions: 1623, language: 'Hindi' },
  { rank: 9, name: 'Sneha Rao', contributions: 1512, language: 'Kannada' },
  { rank: 10, name: 'Amit Joshi', contributions: 1401, language: 'Marathi' },
];

const Leaderboard = () => {
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');

  const languages = ['all', ...new Set(mockContributors.map(c => c.language))];

  const filteredContributors = mockContributors.filter(contributor => {
    const matchesSearch = contributor.name.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || contributor.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-semibold text-muted-foreground">{rank}</span>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-6">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">Community Heroes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Celebrating our top contributors who are shaping the future of multilingual AI in India.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Contributors', value: '10,234', icon: Users },
            { label: 'Contributions Today', value: '1,847', icon: Award },
            { label: 'Languages Covered', value: '22', icon: Trophy },
            { label: 'Quality Score', value: '94%', icon: Medal },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-4 text-center"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search contributors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-end justify-center gap-4 mb-12"
        >
          {[1, 0, 2].map((index) => {
            const contributor = mockContributors[index];
            const isFirst = index === 0;
            return (
              <div
                key={contributor.rank}
                className={cn(
                  "flex flex-col items-center",
                  isFirst ? "order-2" : index === 1 ? "order-1" : "order-3"
                )}
              >
                <div
                  className={cn(
                    "relative rounded-2xl p-6 text-center transition-all hover:scale-105",
                    isFirst
                      ? "bg-gradient-to-br from-primary to-primary-light text-primary-foreground shadow-large"
                      : "bg-card border border-border shadow-medium"
                  )}
                  style={{ minHeight: isFirst ? 200 : 160 }}
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    {getRankIcon(contributor.rank)}
                  </div>
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-3",
                      isFirst
                        ? "bg-primary-foreground/20"
                        : "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                    )}
                  >
                    {getInitials(contributor.name)}
                  </div>
                  <h3 className={cn("font-semibold mb-1", isFirst ? "" : "text-foreground")}>
                    {contributor.name}
                  </h3>
                  <p className={cn("text-sm mb-2", isFirst ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {contributor.language}
                  </p>
                  <div className={cn("text-2xl font-bold", isFirst ? "" : "text-primary")}>
                    {contributor.contributions.toLocaleString()}
                  </div>
                  <p className={cn("text-xs", isFirst ? "text-primary-foreground/60" : "text-muted-foreground")}>
                    contributions
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Contributor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Contributions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredContributors.map((contributor, index) => (
                  <motion.tr
                    key={contributor.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(contributor.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-semibold text-primary">
                          {getInitials(contributor.name)}
                        </div>
                        <span className="font-medium text-foreground">{contributor.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                        {contributor.language}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-foreground">
                        {contributor.contributions.toLocaleString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
