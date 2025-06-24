
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Download, Play, Loader2 } from 'lucide-react';

interface GenericDownloaderProps {
  title: string;
  apiUrl: string;
  placeholder: string;
}

const GenericDownloader: React.FC<GenericDownloaderProps> = ({ title, apiUrl, placeholder }) => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState<{ video?: string; audio?: string; image?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePreview = async () => {
    if (!url.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رابط المحتوى",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setVideoData(null);

    try {
      console.log('جاري جلب المحتوى من:', url);
      const response = await fetch(`${apiUrl}${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error('فشل في جلب المحتوى');
      }

      const data = await response.json();
      console.log('استجابة API:', data);

      if (data.video || data.audio || data.image) {
        setVideoData(data);
        toast({
          title: "تم بنجاح",
          description: "تم جلب المحتوى بنجاح",
        });
      } else {
        throw new Error('لم يتم العثور على رابط المحتوى');
      }
    } catch (error) {
      console.error('خطأ في جلب المحتوى:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب المحتوى. تأكد من صحة الرابط",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (downloadUrl: string, fileName: string) => {
    setProcessing(true);
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const downloadLink = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadLink);
      
      toast({
        title: "تم التحميل",
        description: "تم تحميل الملف بنجاح",
      });
    } catch (error) {
      console.error('خطأ في التحميل:', error);
      toast({
        title: "خطأ في التحميل",
        description: "فشل في تحميل الملف",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="space-y-6">
          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl gradient-text flex items-center justify-center gap-2">
                <Download className="w-6 h-6" />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={placeholder}
                    className="text-right"
                    dir="ltr"
                  />
                </div>
                
                <Button
                  onClick={handlePreview}
                  disabled={loading}
                  className="w-full gradient-bg text-white hover:opacity-90 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري الجلب...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      عرض المحتوى
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {videoData && (
            <Card className="animate-fade-in border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-800 text-center">
                    المحتوى جاهز للتحميل
                  </h3>
                  
                  {videoData.video && (
                    <div className="space-y-3">
                      <video
                        controls
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                        src={videoData.video}
                      >
                        متصفحك لا يدعم تشغيل الفيديو
                      </video>
                      
                      <Button
                        onClick={() => handleDownload(videoData.video!, `video-${Date.now()}.mp4`)}
                        disabled={processing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                      >
                        {processing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            جاري التحميل...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            تحميل الفيديو
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {videoData.audio && (
                    <div className="space-y-3">
                      <audio
                        controls
                        className="w-full"
                        src={videoData.audio}
                      >
                        متصفحك لا يدعم تشغيل الصوت
                      </audio>
                      
                      <Button
                        onClick={() => handleDownload(videoData.audio!, `audio-${Date.now()}.mp3`)}
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        تحميل الصوت
                      </Button>
                    </div>
                  )}

                  {videoData.image && (
                    <div className="space-y-3">
                      <img
                        src={videoData.image}
                        alt="صورة المحتوى"
                        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                      />
                      
                      <Button
                        onClick={() => handleDownload(videoData.image!, `image-${Date.now()}.jpg`)}
                        disabled={processing}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        تحميل الصورة
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericDownloader;
