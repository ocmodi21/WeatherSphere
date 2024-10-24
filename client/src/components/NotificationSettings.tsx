import { useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NotificationSettingsProps {
  selectedCity: string;
  temperatureUnit: string;
}

function saveOrUpdatePreference(newPreference: any) {
  const storedPreferences = localStorage.getItem("notification-preference");
  const existingPreferences = storedPreferences
    ? JSON.parse(storedPreferences)
    : [];

  const cityIndex = existingPreferences.findIndex(
    (pref: { selectedCity: any }) =>
      pref.selectedCity === newPreference.selectedCity
  );

  if (cityIndex !== -1) {
    existingPreferences[cityIndex] = newPreference;
  } else {
    existingPreferences.push(newPreference);
  }

  localStorage.setItem(
    "notification-preference",
    JSON.stringify(existingPreferences)
  );
}

export function NotificationSettings({
  selectedCity,
  temperatureUnit,
}: NotificationSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [threshold, setThreshold] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const preference = {
      threshold,
      selectedCity,
      temperatureUnit,
    };

    if (showEmailInput) {
      localStorage.setItem("email", email);
    }
    saveOrUpdatePreference(preference);

    setEmail("");
    setThreshold("");
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setShowEmailInput(false);
    }
  }, []);

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
          {showEmailInput && (
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
          )}
          <div className="space-y-2">
            <Label htmlFor="threshold" className="text-purple-300">
              Temperature Threshold ({temperatureUnit})
            </Label>
            <Input
              id="threshold"
              type="text"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
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
