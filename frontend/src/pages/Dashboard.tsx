import { useState, useCallback, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sales/AppSidebar";
import FilterDropdown from "@/components/sales/FilterDropdown";
import SortingDropdown, { type SortOption } from "@/components/sales/SortingDropdown";
import TransactionTable, { type Transaction } from "@/components/sales/TransactionTable";
import PaginationControls from "@/components/sales/PaginationControls";
import StatsCard from "@/components/sales/StatsCard";
import EmptyState from "@/components/sales/EmptyState";
import LoadingSkeleton from "@/components/sales/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, X } from "lucide-react";
import { fetchTransactions, fetchStats, fetchFilterOptions } from "@/lib/api";

interface FilterState {
  regions: string[];
  genders: string[];
  categories: string[];
  tags: string[];
  paymentMethods: string[];
  ageMin: string;
  ageMax: string;
  dateStart: string;
  dateEnd: string;
}

const initialFilters: FilterState = {
  regions: [],
  genders: [],
  categories: [],
  tags: [],
  paymentMethods: [],
  ageMin: "",
  ageMax: "",
  dateStart: "",
  dateEnd: "",
};

interface TransactionResponse {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface StatsResponse {
  totalUnits: number;
  totalAmount: number;
  totalDiscount: number;
  transactionCount: number;
}

interface FilterOptions {
  regions: string[];
  genders: string[];
  categories: string[];
}

function buildQueryString(filters: FilterState, sortBy: string, page: number, pageSize: number): string {
  const params = new URLSearchParams();
  
  if (filters.regions.length > 0) params.set("regions", filters.regions.join(","));
  if (filters.genders.length > 0) params.set("genders", filters.genders.join(","));
  if (filters.categories.length > 0) params.set("categories", filters.categories.join(","));
  if (filters.ageMin) params.set("ageMin", filters.ageMin);
  if (filters.ageMax) params.set("ageMax", filters.ageMax);
  if (filters.dateStart) params.set("dateStart", filters.dateStart);
  if (filters.dateEnd) params.set("dateEnd", filters.dateEnd);
  
  params.set("sortBy", sortBy);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));
  
  return params.toString();
}

export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>("customer_asc");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const queryString = useMemo(() => 
    buildQueryString(filters, sortBy, currentPage, pageSize), 
    [filters, sortBy, currentPage]
  );

  const { data: filterOptions } = useQuery<FilterOptions>({
    queryKey: ["/api/filter-options"],
    queryFn: async () => {
      const response = await fetchFilterOptions();
      return response;
    },
  });

  const transactionsUrl = queryString ? `/api/transactions?${queryString}` : "/api/transactions";
  
  const { data: transactionsData, isLoading } = useQuery<TransactionResponse>({
    queryKey: [transactionsUrl],
    queryFn: async () => {
      const params = new URLSearchParams(queryString);
      const response = await fetchTransactions(params);
      return response;
    },
  });

  const statsQueryString = useMemo(() => 
    buildQueryString(filters, sortBy, 1, 10000), 
    [filters, sortBy]
  );

  const statsUrl = statsQueryString ? `/api/transactions/stats?${statsQueryString}` : "/api/transactions/stats";

  const { data: stats } = useQuery<StatsResponse>({
    queryKey: [statsUrl],
    queryFn: async () => {
      const params = new URLSearchParams(statsQueryString);
      const response = await fetchStats(params);
      return response;
    },
  });

  const handleFilterChange = useCallback((key: keyof FilterState, values: string[]) => {
    setFilters(prev => ({ ...prev, [key]: values }));
    setCurrentPage(1);
  }, []);

  const handleRangeChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.regions.length > 0 ||
      filters.genders.length > 0 ||
      filters.categories.length > 0 ||
      filters.tags.length > 0 ||
      filters.paymentMethods.length > 0 ||
      filters.ageMin !== "" ||
      filters.ageMax !== ""
    );
  }, [filters]);

  const transactions = transactionsData?.data ?? [];
  const totalPages = transactionsData?.totalPages ?? 1;
  const totalItems = transactionsData?.total ?? 0;

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  const mockOptions = {
    tags: ["Sale", "New Arrival", "Popular", "Limited Edition", "Premium", "Clearance"],
    paymentMethods: ["Credit Card", "Debit Card", "Cash", "UPI", "Net Banking"],
  };

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full">
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
              <div className="flex items-center gap-2 p-3 flex-wrap">
                <SidebarTrigger className="lg:hidden" data-testid="button-sidebar-toggle" />
                
                <FilterDropdown
                  label="Customer Region"
                  options={filterOptions?.regions ?? []}
                  selectedValues={filters.regions}
                  onChange={(v) => handleFilterChange("regions", v)}
                />
                <FilterDropdown
                  label="Gender"
                  options={filterOptions?.genders ?? []}
                  selectedValues={filters.genders}
                  onChange={(v) => handleFilterChange("genders", v)}
                />
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    className="w-16 h-8 text-xs"
                    value={filters.ageMin}
                    onChange={(e) => handleRangeChange("ageMin", e.target.value)}
                    data-testid="input-age-min"
                  />
                  <span className="text-xs text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    className="w-16 h-8 text-xs"
                    value={filters.ageMax}
                    onChange={(e) => handleRangeChange("ageMax", e.target.value)}
                    data-testid="input-age-max"
                  />
                  <span className="text-xs text-muted-foreground ml-1">Age Range</span>
                </div>
                <FilterDropdown
                  label="Product Category"
                  options={filterOptions?.categories ?? []}
                  selectedValues={filters.categories}
                  onChange={(v) => handleFilterChange("categories", v)}
                />
                <FilterDropdown
                  label="Tags"
                  options={mockOptions.tags}
                  selectedValues={filters.tags}
                  onChange={(v) => handleFilterChange("tags", v)}
                />
                <FilterDropdown
                  label="Payment Method"
                  options={mockOptions.paymentMethods}
                  selectedValues={filters.paymentMethods}
                  onChange={(v) => handleFilterChange("paymentMethods", v)}
                />
                <Button variant="outline" size="sm" className="h-8 gap-1" data-testid="button-date-filter">
                  <Calendar className="h-3.5 w-3.5" />
                  Date
                </Button>

                <div className="ml-auto">
                  <SortingDropdown value={sortBy} onChange={handleSortChange} />
                </div>
              </div>
            </header>

            <main className="flex-1 p-4 space-y-4">
              <div className="flex flex-wrap gap-4">
                <StatsCard 
                  label="Total units sold" 
                  value={stats?.totalUnits ?? 0} 
                />
                <StatsCard
                  label="Total Amount"
                  value={new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                  }).format(stats?.totalAmount ?? 0)}
                  subtitle={`(${stats?.transactionCount ?? 0} SRs)`}
                  highlight
                />
                <StatsCard
                  label="Total Discount"
                  value={new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                  }).format(stats?.totalDiscount ?? 0)}
                  subtitle={`(${Math.round((stats?.transactionCount ?? 0) * 0.4)} SRs)`}
                  highlight
                />
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearFilters}
                    className="self-center"
                    data-testid="button-clear-all"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear filters
                  </Button>
                )}
              </div>

              {isLoading ? (
                <LoadingSkeleton rows={pageSize} />
              ) : transactions.length > 0 ? (
                <>
                  <TransactionTable data={transactions} />
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                  />
                </>
              ) : (
                <EmptyState
                  type="no-results"
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                />
              )}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
