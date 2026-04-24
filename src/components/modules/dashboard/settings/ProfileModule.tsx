"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Camera, Save, Loader2, User, Edit3, Lock, 
  ShieldCheck, X, AlertCircle, KeyRound 
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useProfile } from "../../../../hooks/use-profile";

const ProfileModule = () => {
  const router = useRouter();
  const {
    profile, isFetching, isError,
    isEditing, setIsEditing,
    previewImage, setPreviewImage,
    isPassDialogOpen, setIsPassDialogOpen,
    profileForm, passwordForm,
    handleImageChange,
    updateProfileMutation,
    onPasswordChange,
    passwordPending
  } = useProfile();

  if (isError) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4 bg-white rounded-[3rem] shadow-sm">
        <AlertCircle className="text-red-500" size={48} />
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">Access Denied!</h2>
          <p className="text-slate-500">Please login again to continue.</p>
        </div>
        <Button onClick={() => router.push('/login')} className="bg-indigo-600 rounded-2xl px-8">
          Go to Login
        </Button>
      </div>
    );
  }

  if (isFetching) return (
    <div className="h-96 flex flex-col items-center justify-center space-y-3">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
      <p className="text-slate-400 font-bold">Loading Profile...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border-none rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 bg-white relative">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 w-full" />
        
        <CardContent className="p-8 -mt-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-xl">
                <div className="w-full h-full rounded-[2rem] bg-slate-100 overflow-hidden relative">
                  {previewImage ? (
                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="absolute inset-0 m-auto text-slate-300" />
                  )}
                  {isEditing && (
                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-slate-900 hover:bg-indigo-600 rounded-2xl px-6 py-6 font-black flex items-center gap-2 transition-all shadow-lg">
                <Edit3 size={18} /> Edit Profile
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => { setIsEditing(false); profileForm.reset(); setPreviewImage(profile?.image); }} className="rounded-2xl font-bold text-slate-500">
                  <X size={18} className="mr-1" /> Cancel
                </Button>
                <Button onClick={profileForm.handleSubmit((data) => updateProfileMutation.mutate(data))} disabled={updateProfileMutation.isPending} className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl px-8 py-6 font-black shadow-xl shadow-indigo-100">
                  {updateProfileMutation.isPending ? <Loader2 className="animate-spin" /> : <><Save size={18} className="mr-2" /> Save Changes</>}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <input type="hidden" {...profileForm.register("image")} />
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Display Name</label>
              {isEditing ? (
                <Input {...profileForm.register("name")} className="rounded-2xl border-slate-100 py-7 px-6 font-bold focus:ring-indigo-600" />
              ) : (
                <p className="text-xl font-black text-slate-900 px-1">{profile?.name || "Not set"}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
              <p className="text-lg font-bold text-slate-500 px-1 italic">{profile?.email}</p>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">About Bio</label>
              {isEditing ? (
                <Textarea {...profileForm.register("bio")} className="rounded-[2rem] border-slate-100 min-h-[120px] p-6 font-medium resize-none focus:ring-indigo-600" />
              ) : (
                <p className="text-slate-600 font-medium leading-relaxed px-1">{profile?.bio || "No bio added yet."}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none rounded-[3rem] shadow-xl shadow-slate-100/50 bg-white overflow-hidden group">
        <div className="flex flex-col md:flex-row items-center p-8 gap-8">
          <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-black text-slate-900">Security & Password</h3>
            <p className="text-sm font-bold text-slate-400 mt-1">Keep your account secure by updating your password regularly.</p>
          </div>
          
          <Dialog open={isPassDialogOpen} onOpenChange={setIsPassDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-slate-100 hover:bg-slate-50 px-8 py-7 font-black text-slate-700 flex items-center gap-2 border-2 active:scale-95 transition-all">
                <Lock size={18} /> Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-8">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-black text-2xl">
                  <KeyRound className="text-indigo-600" /> Update Password
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={passwordForm.handleSubmit(onPasswordChange)} className="space-y-6 py-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Current Password</label>
                  <Input type="password" {...passwordForm.register("oldPassword")} className="rounded-2xl py-7 px-6 border-slate-100 font-bold" placeholder="Enter current password" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">New Password</label>
                  <Input type="password" {...passwordForm.register("newPassword")} className="rounded-2xl py-7 px-6 border-slate-100 font-bold" placeholder="Enter new password" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Confirm Password</label>
                  <Input type="password" {...passwordForm.register("confirmPassword")} className="rounded-2xl py-7 px-6 border-slate-100 font-bold" placeholder="Confirm new password" />
                </div>
                <DialogFooter className="mt-8">
                  <Button type="submit" disabled={passwordPending} className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-2xl py-8 font-black text-lg shadow-xl shadow-indigo-100 transition-all">
                    {passwordPending ? <Loader2 className="animate-spin" /> : "Update Password"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default ProfileModule;