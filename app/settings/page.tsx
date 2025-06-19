"use client";

import SimpleSidebar from "@/components/SimpleSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <SimpleSidebar>
      <div>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Customize your experience and preferences
            </p>
          </div>
          
          {/* Appearance Settings */}
          <Card className="glass-surface">
            <CardHeader>
              <CardTitle className="text-xl">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Theme</h4>
                  <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Use sidebar toggle
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Animations</h4>
                  <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass-surface">
            <CardHeader>
              <CardTitle className="text-xl">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Like Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified when someone likes your confession</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Comment Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified when someone comments on your confession</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Repost Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified when someone reposts your confession</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="glass-surface">
            <CardHeader>
              <CardTitle className="text-xl">Privacy & Safety</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Block Anonymous Users</h4>
                  <p className="text-sm text-muted-foreground">Prevent interactions from anonymous users</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Hide Read Confessions</h4>
                  <p className="text-sm text-muted-foreground">Hide confessions you&apos;ve already interacted with</p>
                </div>
                <Switch />
              </div>
              
              <div className="pt-4 border-t border-border">
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleSidebar>
  );
}