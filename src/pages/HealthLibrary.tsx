import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Clock, Star } from "lucide-react";

const HealthLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock health articles data
  const articles = [
    {
      id: 1,
      title: "Understanding High Blood Pressure",
      description: "Complete guide to managing hypertension and lifestyle changes",
      category: "Cardiology",
      language: "English",
      readTime: "8 min",
      rating: 4.8,
      views: 1250
    },
    {
      id: 2,
      title: "Diabetes Management Tips",
      description: "Essential tips for managing diabetes through diet and exercise",
      category: "Endocrinology",
      language: "English",
      readTime: "12 min",
      rating: 4.9,
      views: 2100
    },
    {
      id: 3,
      title: "Mental Health Awareness",
      description: "Understanding anxiety and depression symptoms",
      category: "Psychology",
      language: "French",
      readTime: "6 min",
      rating: 4.7,
      views: 890
    },
    {
      id: 4,
      title: "First Aid Basics",
      description: "Essential first aid techniques everyone should know",
      category: "Emergency",
      language: "English",
      readTime: "10 min",
      rating: 4.9,
      views: 3200
    },
    {
      id: 5,
      title: "Pregnancy Care Guide",
      description: "Complete guide for prenatal care and healthy pregnancy",
      category: "Obstetrics",
      language: "Swahili",
      readTime: "15 min",
      rating: 4.8,
      views: 1800
    }
  ];

  const categories = ["Cardiology", "Endocrinology", "Psychology", "Emergency", "Obstetrics"];
  const languages = ["English", "French", "Swahili"];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === "all" || article.language === selectedLanguage;
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesLanguage && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Health Library</h1>
          <p className="text-muted-foreground">
            Access trusted medical information in multiple languages
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search health articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{article.language}</Badge>
                </div>
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="outline">{article.category}</Badge>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      {article.rating}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{article.views} views</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default HealthLibrary;