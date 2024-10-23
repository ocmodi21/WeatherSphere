import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NotificationSettingsProps {
  temperatureUnit: string;
}

export function NotificationSettings({
  temperatureUnit,
}: NotificationSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [threshold, setThreshold] = useState(35);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Notification settings:", {
      emailNotifications,
      threshold,
      email,
      temperatureUnit,
    });
    // You could also show a success message to the user here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="email-notifications"
          checked={emailNotifications}
          onCheckedChange={setEmailNotifications}
        />
        <Label htmlFor="email-notifications" className="text-purple-300">
          Enable Email Notifications
        </Label>
      </div>
      {emailNotifications && (
        <>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="threshold" className="text-purple-300">
              Temperature Threshold ({temperatureUnit})
            </Label>
            <Input
              id="threshold"
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              required
              className="bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
        </>
      )}
      <Button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Save Notification Settings
      </Button>
    </form>
  );
}
