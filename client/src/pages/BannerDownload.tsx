import { useRef } from 'react';
import { Banner } from '@/components/Banner';
import { ProfilePicture } from '@/components/ProfilePicture';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

export function BannerDownload() {
  const downloadBanner = () => {
    const canvas = document.querySelector('.banner-canvas');
    if (!canvas) {
      toast({
        title: 'Error',
        description: 'Could not find the banner canvas.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Create download link
      const link = document.createElement('a');
      link.download = 'reposcan-banner.png';
      link.href = (canvas as HTMLCanvasElement).toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Success',
        description: 'Banner downloaded successfully! You can now use this image for your X.com profile.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download the banner. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadProfilePic = () => {
    const canvas = document.querySelector('.profile-canvas');
    if (!canvas) {
      toast({
        title: 'Error',
        description: 'Could not find the profile picture canvas.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Create download link
      const link = document.createElement('a');
      link.download = 'reposcan-profile.png';
      link.href = (canvas as HTMLCanvasElement).toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Success',
        description: 'Profile picture downloaded successfully! You can now use this image for your X.com profile.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download the profile picture. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Download Your X.com Assets</h1>
          <p className="text-gray-400">Get your RepoScan banner and profile picture for X.com</p>
        </div>

        {/* Banner Section */}
        <Card className="p-6 bg-black/30 border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Banner Image</h2>
          <p className="text-gray-400 mb-4">Perfect size for X.com (1500x500 pixels)</p>
          <Banner />
          <div className="flex justify-center mt-6">
            <Button
              onClick={downloadBanner}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Banner
            </Button>
          </div>
        </Card>

        {/* Profile Picture Section */}
        <Card className="p-6 bg-black/30 border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Profile Picture</h2>
          <p className="text-gray-400 mb-4">Perfect size for X.com (400x400 pixels)</p>
          <ProfilePicture />
          <div className="flex justify-center mt-6">
            <Button
              onClick={downloadProfilePic}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Profile Picture
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}