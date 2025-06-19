"use client";

import SimpleSidebar from "@/components/SimpleSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <SimpleSidebar>
      <div>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your anonymous identity and preferences
            </p>
          </div>
          
          {/* Profile Info Card */}
          <Card className="glass-surface">
            <CardHeader>
              <CardTitle className="text-xl">Anonymous Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Anonymous User</h3>
                  <p className="text-muted-foreground">Member since today</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Confessions</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Likes Given</div>
                </div>
                <div className="text-center p-4 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="glass-surface">
            <CardHeader>
              <CardTitle className="text-xl">Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Anonymous Mode</h4>
                  <p className="text-sm text-muted-foreground">All your posts are completely anonymous</p>
                </div>
                <Button variant="secondary" size="sm">
                  Always On
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Notification Preferences</h4>
                  <p className="text-sm text-muted-foreground">Choose what notifications you want to receive</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleSidebar>
  );
}