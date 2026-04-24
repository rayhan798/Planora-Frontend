"use client";

import React, { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Plus, MapPin, Ticket, Loader2, X, Upload } from "lucide-react";
import { useCreateEvent } from "../../../../hooks/use-create-event";

export default function CreateEventModal() {
  const [open, setOpen] = useState(false);
  const { 
    form, previewUrl, fileInputRef, isPending, 
    handleImageChange, removeImage, handleCreateEvent 
  } = useCreateEvent(() => setOpen(false));

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;
  const isPublicValue = watch("isPublic");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black gap-2 shadow-lg transition-all hover:-translate-y-1 active:scale-95">
          <Plus size={20} /> Create New Event
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 overflow-y-auto max-h-[90vh] shadow-2xl border-none outline-none">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-4xl font-black text-slate-900 tracking-tight">
            Host New <span className="text-indigo-600">Experience</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">
            Upload a banner and fill in the details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit((data) => handleCreateEvent(data))} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Event Banner</label>
            <input 
              type="file" accept="image/*" className="hidden" 
              ref={fileInputRef} onChange={handleImageChange}
            />

            {previewUrl ? (
              <div className="relative group rounded-[2.5rem] overflow-hidden border-2 border-slate-100 aspect-video shadow-inner">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={removeImage} className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-rose-500 shadow-xl hover:bg-white transition-colors">
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-all group">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-300 group-hover:text-indigo-600 transition-colors">
                  <Upload size={32} />
                </div>
                <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to upload banner</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Event Title</label>
            <Input {...register("title")} placeholder="e.g. Tech Carnival" className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold focus:bg-white transition-all outline-none" />
            {errors.title && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date</label>
              <Input 
                type="date" min={new Date().toISOString().split("T")[0]} 
                {...register("date")} className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold outline-none" 
              />
              {errors.date && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.date.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Time</label>
              <Input type="time" {...register("time")} className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold outline-none" />
              {errors.time && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.time.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Venue / Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input {...register("venue")} placeholder="Location name" className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold outline-none" />
            </div>
            {errors.venue && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.venue.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Privacy</label>
              <Select value={isPublicValue ? "public" : "private"} onValueChange={(val) => setValue("isPublic", val === "public")}>
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold outline-none">
                  <SelectValue placeholder="Public" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl font-bold">
                  <SelectItem value="public">🌍 Public</SelectItem>
                  <SelectItem value="private">🔒 Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Fee (BDT)</label>
              <div className="relative">
                <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input type="number" {...register("fee")} placeholder="0" className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Description</label>
            <Textarea {...register("description")} placeholder="Write about your event..." className="min-h-[120px] rounded-[2rem] bg-slate-50 border-slate-100 p-6 font-medium focus:bg-white transition-all outline-none" />
            {errors.description && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.description.message}</p>}
          </div>

          <Button 
            disabled={isPending} type="submit" 
            className="w-full h-16 bg-slate-950 hover:bg-black text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            {isPending ? (
              <><Loader2 className="animate-spin" size={24} /> Launching...</>
            ) : (
              "Launch Event"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}