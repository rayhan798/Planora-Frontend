"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEditEvent } from "../../../../hooks/use-edit-event";

export default function EditEventModal({ event, isOpen, onClose }: any) {
  const { formData, setFormData, handleUpdate, isPending } = useEditEvent(event, isOpen, onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-[3rem] border-none p-8 md:p-10 overflow-y-auto max-h-[90vh] shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
            Edit <span className="text-indigo-600">Experience</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">
            Refine your event details for your guests
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Event Title</label>
            <Input 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold" 
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date</label>
              <Input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Time</label>
              <Input 
                type="time" 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Venue / Location</label>
            <Input 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Privacy</label>
              <Select 
                value={formData.privacy} 
                onValueChange={(val) => setFormData({...formData, privacy: val})}
              >
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl font-bold">
                  <SelectItem value="public">🌍 Public</SelectItem>
                  <SelectItem value="private">🔒 Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Fee (BDT)</label>
              <Input 
                type="number"
                value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: e.target.value})}
                className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Description</label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="min-h-[100px] rounded-[1.5rem] bg-slate-50 border-slate-100 font-medium p-4" 
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1 h-14 rounded-2xl font-bold text-slate-400 border-slate-100"
            >
              Cancel
            </Button>
            <Button 
              disabled={isPending} 
              type="submit" 
              className="flex-[2] h-14 rounded-2xl bg-slate-950 hover:bg-black text-white font-black shadow-xl transition-all"
            >
              {isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : "Update Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}