import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, Shield } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function Verify() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [state, setState] = useState("");

  const verifyMutation = trpc.auth.verifyUser.useMutation({
    onSuccess: () => {
      toast.success("Verification successful! Welcome to TDSART Fantasy!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateOfBirth || !state) {
      toast.error("Please fill in all fields");
      return;
    }

    verifyMutation.mutate({ dateOfBirth, state });
  };

  if (user?.isVerified) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-card">
      <Card className="max-w-2xl w-full p-8 bg-card border-border card-glow">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Verification Required</h1>
          <p className="text-muted-foreground">
            Please verify your age and location to continue
          </p>
        </div>

        <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">Legal Requirements</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• You must be 18 years or older</li>
                <li>• This platform is NOT available in: Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim</li>
                <li>• This is a skill-based, free-to-play platform with no real money involved</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              You must be 18 years or older
            </p>
          </div>

          <div>
            <Label htmlFor="state">State/Union Territory</Label>
            <Select value={state} onValueChange={setState} required>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((stateName) => (
                  <SelectItem key={stateName} value={stateName}>
                    {stateName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Select the state where you currently reside
            </p>
          </div>

          <Button
            type="submit"
            className="w-full btn-gradient"
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify & Continue"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>By continuing, you confirm that:</p>
          <ul className="mt-2 space-y-1">
            <li>• You are 18 years or older</li>
            <li>• You reside in a state where this platform is permitted</li>
            <li>• You agree to our Terms & Conditions</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
