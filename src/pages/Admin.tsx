
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface HeritageLocation {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  image_url: string;
  location_city: string;
  location_state: string;
  historical_period: string;
  category_id: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

const Admin = () => {
  const [items, setItems] = useState<HeritageLocation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    full_description: "",
    image_url: "",
    location_city: "",
    location_state: "",
    historical_period: "",
    category_id: "",
  });
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    if (!isAdmin) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive"
      });
      return;
    }
    
    fetchData();
  }, [user, isAdmin, navigate]);

  const fetchData = async () => {
    try {
      // Fetch heritage locations
      const { data: locations, error: locationsError } = await supabase
        .from('heritage_locations')
        .select('*')
        .order('created_at', { ascending: false });

      if (locationsError) throw locationsError;

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name');

      if (categoriesError) throw categoriesError;

      setItems(locations || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error loading data",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('heritage_locations')
        .insert([{
          ...formData,
          created_by: user?.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setItems([data, ...items]);
      setFormData({
        title: "",
        short_description: "",
        full_description: "",
        image_url: "",
        location_city: "",
        location_state: "",
        historical_period: "",
        category_id: "",
      });
      setIsDialogOpen(false);

      toast({
        title: "Location added",
        description: "The heritage location has been added successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error adding location",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('heritage_locations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(items.filter(item => item.id !== id));
      toast({
        title: "Location deleted",
        description: "The heritage location has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting location",
        description: error.message,
        variant: "destructive",
      });
    }
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-india-saffron hover:bg-india-deepSaffron">
              <Plus size={16} className="mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Heritage Location</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter title" 
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Short Description</label>
                <textarea 
                  value={formData.short_description}
                  onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                  className="w-full p-2 border rounded-md" 
                  rows={2}
                  placeholder="Enter short description"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Full Description</label>
                <textarea 
                  value={formData.full_description}
                  onChange={(e) => setFormData({...formData, full_description: e.target.value})}
                  className="w-full p-2 border rounded-md" 
                  rows={4}
                  placeholder="Enter full description"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input 
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="Enter image URL" 
                  type="url"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Input 
                    value={formData.location_city}
                    onChange={(e) => setFormData({...formData, location_city: e.target.value})}
                    placeholder="City" 
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">State</label>
                  <Input 
                    value={formData.location_state}
                    onChange={(e) => setFormData({...formData, location_state: e.target.value})}
                    placeholder="State" 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Historical Period</label>
                <Input 
                  value={formData.historical_period}
                  onChange={(e) => setFormData({...formData, historical_period: e.target.value})}
                  placeholder="e.g., Mughal Era, Medieval Period" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select 
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-india-saffron hover:bg-india-deepSaffron"
              >
                Add Location
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-medium mb-2">Welcome, {user?.user_metadata?.full_name || user?.email}</h2>
          <p className="text-gray-500 text-sm">Manage heritage locations and content</p>
        </div>

        <h2 className="font-medium text-lg mb-4 mt-6">Heritage Locations ({items.length})</h2>
        
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <img 
                src={item.image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000"} 
                alt={item.title} 
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.location_city}, {item.location_state}</p>
                <p className="text-xs text-gray-400 mt-1">Added: {new Date(item.created_at).toLocaleDateString()}</p>
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
