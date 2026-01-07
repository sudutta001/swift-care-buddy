import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, ArrowLeft, Heart, Phone, Calendar, Droplets, 
  Save, Plus, Trash2, MapPin, AlertCircle, Users
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfilePageProps {
  onBack: () => void;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  blood_group: string | null;
}

interface MedicalHistory {
  id: string;
  condition_name: string;
  is_ongoing: boolean;
}

interface Allergy {
  id: string;
  allergy_name: string;
  severity: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  is_primary: boolean;
}

interface SavedAddress {
  id: string;
  label: string;
  address_line1: string;
  city: string;
  pincode: string;
  is_default: boolean;
}

const ProfilePage = ({ onBack }: ProfilePageProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'profile' | 'medical' | 'contacts' | 'addresses'>('profile');
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
  });

  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);

  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [newAddress, setNewAddress] = useState({ label: '', address_line1: '', city: '', pincode: '' });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchMedicalHistory();
      fetchAllergies();
      fetchEmergencyContacts();
      fetchSavedAddresses();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user!.id)
      .maybeSingle();
    
    if (data) {
      setProfile({
        full_name: data.full_name || '',
        phone: data.phone || '',
        date_of_birth: data.date_of_birth || '',
        gender: data.gender || '',
        blood_group: data.blood_group || '',
      });
    }
  };

  const fetchMedicalHistory = async () => {
    const { data } = await supabase
      .from('medical_history')
      .select('id, condition_name, is_ongoing')
      .eq('user_id', user!.id);
    if (data) setMedicalHistory(data);
  };

  const fetchAllergies = async () => {
    const { data } = await supabase
      .from('allergies')
      .select('id, allergy_name, severity')
      .eq('user_id', user!.id);
    if (data) setAllergies(data);
  };

  const fetchEmergencyContacts = async () => {
    const { data } = await supabase
      .from('emergency_contacts')
      .select('id, name, phone, relationship, is_primary')
      .eq('user_id', user!.id);
    if (data) setEmergencyContacts(data);
  };

  const fetchSavedAddresses = async () => {
    const { data } = await supabase
      .from('saved_addresses')
      .select('id, label, address_line1, city, pincode, is_default')
      .eq('user_id', user!.id);
    if (data) setSavedAddresses(data);
  };

  const saveProfile = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('user_id', user!.id);
    
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Profile updated successfully" });
    }
  };

  const addMedicalCondition = async () => {
    if (!newCondition.trim()) return;
    const { error } = await supabase
      .from('medical_history')
      .insert({ user_id: user!.id, condition_name: newCondition, is_ongoing: true });
    
    if (!error) {
      setNewCondition('');
      fetchMedicalHistory();
      toast({ title: "Added", description: "Medical condition added" });
    }
  };

  const deleteMedicalCondition = async (id: string) => {
    await supabase.from('medical_history').delete().eq('id', id);
    fetchMedicalHistory();
  };

  const addAllergy = async () => {
    if (!newAllergy.trim()) return;
    const { error } = await supabase
      .from('allergies')
      .insert({ user_id: user!.id, allergy_name: newAllergy, severity: 'moderate' });
    
    if (!error) {
      setNewAllergy('');
      fetchAllergies();
      toast({ title: "Added", description: "Allergy added" });
    }
  };

  const deleteAllergy = async (id: string) => {
    await supabase.from('allergies').delete().eq('id', id);
    fetchAllergies();
  };

  const addEmergencyContact = async () => {
    if (!newContact.name || !newContact.phone || !newContact.relationship) return;
    const { error } = await supabase
      .from('emergency_contacts')
      .insert({ user_id: user!.id, ...newContact, is_primary: emergencyContacts.length === 0 });
    
    if (!error) {
      setNewContact({ name: '', phone: '', relationship: '' });
      fetchEmergencyContacts();
      toast({ title: "Added", description: "Emergency contact added" });
    }
  };

  const deleteEmergencyContact = async (id: string) => {
    await supabase.from('emergency_contacts').delete().eq('id', id);
    fetchEmergencyContacts();
  };

  const addAddress = async () => {
    if (!newAddress.label || !newAddress.address_line1 || !newAddress.city || !newAddress.pincode) return;
    const { error } = await supabase
      .from('saved_addresses')
      .insert({ 
        user_id: user!.id, 
        ...newAddress, 
        state: 'State', 
        is_default: savedAddresses.length === 0 
      });
    
    if (!error) {
      setNewAddress({ label: '', address_line1: '', city: '', pincode: '' });
      fetchSavedAddresses();
      toast({ title: "Added", description: "Address saved" });
    }
  };

  const deleteAddress = async (id: string) => {
    await supabase.from('saved_addresses').delete().eq('id', id);
    fetchSavedAddresses();
  };

  const sections = [
    { id: 'profile', label: 'Basic Info', icon: User },
    { id: 'medical', label: 'Medical', icon: Heart },
    { id: 'contacts', label: 'Emergency', icon: Users },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-secondary transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold">My Profile</h1>
        </div>
        
        {/* Section Tabs */}
        <div className="flex gap-1 px-4 pb-3 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as typeof activeSection)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap
                  ${activeSection === section.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Basic Info */}
        {activeSection === 'profile' && (
          <Card variant="elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={profile.full_name || ''}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input
                    type="date"
                    value={profile.date_of_birth || ''}
                    onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <select
                    value={profile.gender || ''}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-destructive" />
                  Blood Group
                </label>
                <select
                  value={profile.blood_group || ''}
                  onChange={(e) => setProfile({ ...profile, blood_group: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <Button onClick={saveProfile} className="w-full" disabled={loading}>
                <Save className="h-4 w-4" />
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Medical History */}
        {activeSection === 'medical' && (
          <>
            <Card variant="elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-4 w-4 text-destructive" />
                  Medical Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {medicalHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm font-medium">{item.condition_name}</span>
                    <button onClick={() => deleteMedicalCondition(item.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add condition (e.g., Diabetes)"
                  />
                  <Button onClick={addMedicalCondition} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  Allergies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allergies.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-warning/10">
                    <span className="text-sm font-medium">{item.allergy_name}</span>
                    <button onClick={() => deleteAllergy(item.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add allergy (e.g., Penicillin)"
                  />
                  <Button onClick={addAllergy} size="icon" variant="warning">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Emergency Contacts */}
        {activeSection === 'contacts' && (
          <Card variant="elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Phone className="h-4 w-4 text-destructive" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.relationship} • {contact.phone}</p>
                  </div>
                  <button onClick={() => deleteEmergencyContact(contact.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="space-y-2 pt-2 border-t border-border">
                <Input
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Contact Name"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    placeholder="Phone Number"
                  />
                  <Input
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                    placeholder="Relationship"
                  />
                </div>
                <Button onClick={addEmergencyContact} className="w-full" variant="destructive">
                  <Plus className="h-4 w-4" />
                  Add Emergency Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Saved Addresses */}
        {activeSection === 'addresses' && (
          <Card variant="elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Saved Addresses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="flex items-start justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2">
                      {addr.label}
                      {addr.is_default && (
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {addr.address_line1}, {addr.city} - {addr.pincode}
                    </p>
                  </div>
                  <button onClick={() => deleteAddress(addr.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                    placeholder="Label (Home, Office)"
                  />
                  <Input
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    placeholder="PIN Code"
                  />
                </div>
                <Input
                  value={newAddress.address_line1}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                  placeholder="Full Address"
                />
                <Input
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="City"
                />
                <Button onClick={addAddress} className="w-full">
                  <Plus className="h-4 w-4" />
                  Add Address
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
