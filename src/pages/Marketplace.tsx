import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InvestmentAnalysis from "@/components/features/InvestmentAnalysis";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  DollarSign,
  Star,
  Shield,
  Target,
} from "lucide-react";

interface InvoiceListing {
  id: string;
  company: string;
  amount: number;
  currency: string;
  dueDate: string;
  funded: number;
  creditScore: number;
  industry: string;
  riskLevel: string;
  expectedReturn: number;
  daysLeft: number;
  verified: boolean;
}

const Marketplace = () => {
  const navigate = useNavigate();

  const handleInvestNow = (invoice: InvoiceListing) => {
    toast({
      title: "Investment Initiated",
      description: `Starting investment process for ${
        invoice.company
      } - $${invoice.amount.toLocaleString()}`,
    });
    // Navigate to investment details with specific invoice data
    navigate(`/investment/${invoice.id}`);
  };

  const handleViewDetails = (invoice: InvoiceListing) => {
    // Navigate to investment details for viewing
    navigate(`/investment/${invoice.id}`);
  };

  const [invoiceListings, setInvoiceListings] = useState<InvoiceListing[]>([
    {
      id: "INV-001",
      company: "TechFlow Solutions",
      amount: 125000,
      currency: "USD",
      dueDate: "2024-03-15",
      funded: 78,
      creditScore: 847,
      industry: "Technology",
      riskLevel: "Low",
      expectedReturn: 8.5,
      daysLeft: 14,
      verified: true,
    },
    {
      id: "INV-002",
      company: "Green Energy Corp",
      amount: 89500,
      currency: "USD",
      dueDate: "2024-04-22",
      funded: 34,
      creditScore: 792,
      industry: "Energy",
      riskLevel: "Medium",
      expectedReturn: 12.3,
      daysLeft: 21,
      verified: true,
    },
    {
      id: "INV-003",
      company: "RetailMax Inc",
      amount: 67800,
      currency: "USD",
      dueDate: "2024-02-28",
      funded: 92,
      creditScore: 734,
      industry: "Retail",
      riskLevel: "Medium",
      expectedReturn: 9.7,
      daysLeft: 8,
      verified: false,
    },
    {
      id: "INV-004",
      company: "MedTech Innovations",
      amount: 156000,
      currency: "USD",
      dueDate: "2024-05-10",
      funded: 12,
      creditScore: 901,
      industry: "Healthcare",
      riskLevel: "Low",
      expectedReturn: 7.2,
      daysLeft: 28,
      verified: true,
    },
  ]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-success";
      case "Medium":
        return "text-warning";
      case "High":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Invoice Marketplace</h1>
            <p className="text-muted-foreground">
              Discover investment opportunities in verified invoices
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {invoiceListings.length} Active Listings
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by company or invoice ID..."
                    className="pl-10 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-[180px] bg-secondary/50 border-border/50">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[150px] bg-secondary/50 border-border/50">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[150px] bg-secondary/50 border-border/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount-desc">
                    Amount (High to Low)
                  </SelectItem>
                  <SelectItem value="amount-asc">
                    Amount (Low to High)
                  </SelectItem>
                  <SelectItem value="return-desc">
                    Return (High to Low)
                  </SelectItem>
                  <SelectItem value="credit-desc">Credit Score</SelectItem>
                  <SelectItem value="time-asc">Time Remaining</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
                onClick={() => {
                  /* Filter functionality can be added later */
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Listings */}
        <div className="grid gap-6 lg:grid-cols-2">
          {invoiceListings.map((invoice) => (
            <Card
              key={invoice.id}
              className="glass-card hover:highlight-border transition-smooth group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">
                        {invoice.company}
                      </CardTitle>
                      {invoice.verified && (
                        <Shield className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{invoice.id}</span>
                      <span>•</span>
                      <span>{invoice.industry}</span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${getRiskColor(
                      invoice.riskLevel
                    )} bg-secondary/50`}
                  >
                    {invoice.riskLevel} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Amount and Return */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {formatAmount(invoice.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Invoice Amount
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-success">
                      {invoice.expectedReturn}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expected Return
                    </p>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Funding Progress</span>
                    <span>{invoice.funded}%</span>
                  </div>
                  <Progress value={invoice.funded} />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {formatAmount((invoice.amount * invoice.funded) / 100)}{" "}
                      raised
                    </span>
                    <span>{invoice.daysLeft} days left</span>
                  </div>
                </div>

                {/* Credit Score and Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="font-semibold">
                        {invoice.creditScore}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Credit Score
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{invoice.daysLeft}d</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Time Left</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="font-semibold">
                        {invoice.expectedReturn}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">ROI</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    className="flex-1 glow group-hover:scale-105 transition-smooth"
                    onClick={() => handleInvestNow(invoice)}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Invest Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-primary/30 hover:bg-primary/10"
                    onClick={() => handleViewDetails(invoice)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investment Analysis */}
        <InvestmentAnalysis
          invoiceId="marketplace-overview"
          companyName="Market Analysis"
        />

        {/* Load More */}
        <div className="text-center pt-6">
          {hasMore && (
            <Button
              variant="outline"
              size="lg"
              onClick={async () => {
                try {
                  setLoading(true);
                  // Simulating API call delay
                  await new Promise((resolve) => setTimeout(resolve, 1000));

                  // Load more dummy data
                  const newInvoices = [
                    {
                      id: `INV-00${page + 3}`,
                      company: "Tech Enterprise Ltd",
                      amount: 95000,
                      currency: "USD",
                      dueDate: "2024-05-15",
                      funded: 45,
                      creditScore: 815,
                      industry: "Technology",
                      riskLevel: "Low",
                      expectedReturn: 9.2,
                      daysLeft: 30,
                      verified: true,
                    },
                    {
                      id: `INV-00${page + 4}`,
                      company: "Global Logistics Co",
                      amount: 78000,
                      currency: "USD",
                      dueDate: "2024-06-01",
                      funded: 62,
                      creditScore: 788,
                      industry: "Transportation",
                      riskLevel: "Medium",
                      expectedReturn: 11.5,
                      daysLeft: 45,
                      verified: true,
                    },
                  ];

                  setInvoiceListings((prev) => [...prev, ...newInvoices]);
                  setPage((p) => p + 1);

                  // If we've loaded enough items, set hasMore to false
                  if (page >= 3) {
                    setHasMore(false);
                  }

                  toast({
                    title: "Listings Updated",
                    description:
                      "New investment opportunities loaded successfully.",
                  });
                } catch (error) {
                  console.error("Error loading more listings:", error);
                  toast({
                    title: "Error",
                    description:
                      "Failed to load more listings. Please try again.",
                    variant: "destructive",
                  });
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Load More Listings"
              )}
            </Button>
          )}
          {!hasMore && (
            <p className="text-muted-foreground mt-4">
              You've reached the end of the listings
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
