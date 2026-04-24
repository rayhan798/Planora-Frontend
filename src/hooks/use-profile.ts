import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { 
  getMyProfile, 
  updateProfileAction, 
  updatePasswordAction 
} from "@/app/(public)/events/_actions";

interface ProfileFormInputs {
  name: string;
  bio: string;
  image?: string;
}

export const useProfile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);

  const { data: profile, isLoading: isFetching, isError } = useQuery({
    queryKey: ['my-profile'],
    queryFn: getMyProfile,
    retry: 1,
  });

  const profileForm = useForm<ProfileFormInputs>();
  const passwordForm = useForm();

  useEffect(() => {
    if (profile) {
      profileForm.reset({ 
        name: profile.name, 
        bio: profile.bio || "", 
        image: profile.image || "" 
      });
      setPreviewImage(profile.image);
    }
  }, [profile, profileForm]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64); 
        profileForm.setValue("image", base64, { shouldDirty: true }); 
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: (res: any) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['my-profile'] });
        toast.success(res.message || "Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(res.message || "Update failed");
      }
    },
    onError: (err: any) => toast.error(err?.message || "Something went wrong")
  });

  const updatePasswordMutation = useMutation({
    mutationFn: updatePasswordAction,
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success(res.message || "Password updated successfully!");
        passwordForm.reset();
        setIsPassDialogOpen(false);
      } else {
        toast.error(res.message || "Failed to update password");
      }
    },
    onError: (err: any) => toast.error(err?.message || "Error updating password")
  });

  const onPasswordChange = async (data: any) => {
    if (!data.oldPassword) return toast.error("Please enter your current password");
    if (data.newPassword !== data.confirmPassword) return toast.error("New passwords do not match!");
    if (data.newPassword.length < 6) return toast.error("Password must be at least 6 characters!");
    
    updatePasswordMutation.mutate({ 
      oldPassword: data.oldPassword, 
      newPassword: data.newPassword 
    });
  };

  return {
    profile, isFetching, isError,
    isEditing, setIsEditing,
    previewImage, setPreviewImage,
    isPassDialogOpen, setIsPassDialogOpen,
    profileForm, passwordForm,
    handleImageChange,
    updateProfileMutation,
    onPasswordChange,
    passwordPending: updatePasswordMutation.isPending
  };
};