
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockHeritageData, HeritageItem } from "@/data/heritageData";
import { toast } from "@/components/ui/use-toast";

const Admin = () => {
  const [items, setItems] = useState<HeritageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and is admin
    const storedUser = localStorage.getItem("echoes_user");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    
    const userData = JSON.parse(storedUser);
    if (userData.role !== "admin") {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive"
      });
      return;
    }
    
    setUser(userData);
    setItems(mockHeritageData);
    setLoading(false);
  }, [navigate]);

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item deleted",
      description: "The heritage item has been deleted successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-poppins font-semibold ml-2">Admin Panel</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-india-saffron hover:bg-india-deepSaffron">
              <Plus size={16} className="mr-2" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Heritage Item</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter title" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full p-2 border rounded-md" 
                    rows={4}
                    placeholder="Enter description"
                  ></textarea>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="State" />
                    <Input placeholder="City" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="Category" />
                </div>
                <Button 
                  type="button" 
                  className="w-full bg-india-saffron hover:bg-india-deepSaffron"
                  onClick={() => {
                    toast({
                      title: "This is a demo",
                      description: "In a real app, this would save a new heritage item.",
                    });
                  }}
                >
                  Save Item
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-medium mb-2">Welcome, {user?.name}</h2>
          <p className="text-gray-500 text-sm">Manage heritage items and user content</p>
        </div>

        <h2 className="font-medium text-lg mb-4 mt-6">Heritage Items ({items.length})</h2>
        
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.location.city}, {item.location.state}</p>
                <p className="text-xs text-gray-400 mt-1">Added: {new Date(item.dateAdded).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit size={18} className="text-gray-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 size={18} className="text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Admin;
