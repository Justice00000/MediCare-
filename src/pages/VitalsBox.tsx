import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Thermometer, Activity, Truck, CheckCircle, Clock, Package } from "lucide-react";

const VitalsBox = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Mock vitals box plans
  const plans = [
    {
      id: "basic",
      name: "Basic Vitals Box",
      price: "$29/month",
      description: "Essential health monitoring tools",
      features: [
        "Digital Thermometer",
        "Blood Pressure Monitor", 
        "Pulse Oximeter",
        "Monthly delivery",
        "Basic health tracking app"
      ],
      popular: false
    },
    {
      id: "premium", 
      name: "Premium Vitals Box",
      price: "$49/month",
      description: "Comprehensive health monitoring kit",
      features: [
        "Everything in Basic",
        "Smart Scale",
        "Blood Glucose Monitor",
        "ECG Monitor",
        "Bi-weekly delivery",
        "Advanced health analytics",
        "Telemedicine integration"
      ],
      popular: true
    },
    {
      id: "family",
      name: "Family Vitals Box",
      price: "$79/month", 
      description: "Complete family health monitoring",
      features: [
        "Everything in Premium",
        "Multiple user profiles",
        "Pediatric attachments",
        "Emergency alert system",
        "Weekly delivery",
        "Family health dashboard",
        "Priority doctor access"
      ],
      popular: false
    }
  ];

  // Mock current subscription data
  const currentSubscription = {
    plan: "Premium Vitals Box",
    status: "Active",
    nextDelivery: "March 15, 2024",
    deliveryProgress: 75
  };

  // Mock delivery history
  const deliveryHistory = [
    {
      id: 1,
      date: "February 15, 2024",
      status: "Delivered",
      items: ["Blood Pressure Monitor", "Pulse Oximeter", "Test Strips"]
    },
    {
      id: 2,
      date: "February 1, 2024", 
      status: "Delivered",
      items: ["Digital Thermometer", "Smart Scale", "ECG Monitor"]
    },
    {
      id: 3,
      date: "January 15, 2024",
      status: "Delivered", 
      items: ["Blood Glucose Monitor", "Lancets", "Alcohol Swabs"]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Vitals Box</h1>
          <p className="text-muted-foreground">
            Get essential health monitoring equipment delivered to your door
          </p>
        </div>

        {/* Current Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{currentSubscription.plan}</p>
                  <p className="text-sm text-muted-foreground">Status: {currentSubscription.status}</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Active
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Next delivery: {currentSubscription.nextDelivery}</span>
                  <span>{currentSubscription.deliveryProgress}%</span>
                </div>
                <Progress value={currentSubscription.deliveryProgress} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Truck className="h-4 w-4 mr-2" />
                  Track Delivery
                </Button>
                <Button variant="outline" size="sm">
                  Modify Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Available Plans</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                } ${
                  selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    {plan.popular && (
                      <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">{plan.price}</p>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-4" 
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Delivery History */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Delivery History</h2>
          <div className="space-y-4">
            {deliveryHistory.map((delivery) => (
              <Card key={delivery.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{delivery.date}</p>
                      <p className="text-sm text-muted-foreground">
                        Items: {delivery.items.join(", ")}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {delivery.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Health Monitoring Tools */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Health Monitoring Tools</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="font-medium">Blood Pressure</p>
                    <p className="text-2xl font-bold">120/80</p>
                    <p className="text-sm text-muted-foreground">Normal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">Temperature</p>
                    <p className="text-2xl font-bold">98.6°F</p>
                    <p className="text-sm text-muted-foreground">Normal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Activity className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-medium">Heart Rate</p>
                    <p className="text-2xl font-bold">72 BPM</p>
                    <p className="text-sm text-muted-foreground">Normal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="font-medium">Last Reading</p>
                    <p className="text-lg font-bold">2 hours ago</p>
                    <p className="text-sm text-muted-foreground">All normal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VitalsBox;