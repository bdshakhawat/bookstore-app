"use client";
import { useClerk } from "@clerk/nextjs"; // Import useClerk for sign-out functionality
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function SettingsPage() {
    // Initialize Clerk signOut function
  const { signOut } = useClerk(); 
  // Initialize Next.js router
  const router = useRouter(); 

  // Handle sign out
  const handleSignOut = async () => {
    // Sign out the user
    await signOut(); 
    // Redirect to the home page
    router.push("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>

        {/* Sign Out Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>

        {/* Settings Content */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

          {/* Profile Section */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Update Profile
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Theme
                </label>
                <select className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Save Preferences
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div>
            <h3 className="text-xl font-medium mb-4">Security</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}