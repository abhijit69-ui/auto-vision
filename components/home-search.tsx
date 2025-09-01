'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import { Camera, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [searchImage, setSearchImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };
  const handleImageSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error('Please upload an image first');
      return;
    }

    // Add ai logic here
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setIsUploading(true);
      setSearchImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setImagePreview(result);
          toast.success('Image uploaded successfully');
        } else {
          toast.error('Failed to read the image');
        }
        setIsUploading(false);
      };

      reader.onerror = () => {
        setIsUploading(false);
        toast.error('Failed to read the image');
      };

      reader.readAsDataURL(file);
    }
  };
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png'],
      },
      maxFiles: 1,
    });

  return (
    <div>
      <form onSubmit={handleTextSubmit}>
        <div className='relative flex items-center'>
          <Input
            type='text'
            placeholder='Search by make, model, or try our AI image search....'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm'
          />

          <div className='absolute right-[100px] '>
            <Camera
              size={35}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className='cursor-pointer rounded-full p-1.5'
              style={{
                background: isImageSearchActive ? 'black' : '',
                color: isImageSearchActive ? 'white' : '',
              }}
            />
          </div>

          <Button type='submit' className='absolute right-2 rounded-full'>
            Search
          </Button>
        </div>
      </form>

      {isImageSearchActive && (
        <div className='mt-4'>
          <form onSubmit={handleImageSearch}>
            <div className='border-2 border-dashed border-gray-100 rounded-3xl p-6 text-center'>
              {imagePreview ? (
                <div className='flex flex-col items-center'>
                  <Image
                    src={imagePreview}
                    alt='car preview'
                    width={600} // adjust to match your layout
                    height={240} // adjust to match your layout (h-40 ≈ 160px; pick values that match)
                    className='h-40 object-contain mb-4'
                    priority // mark critical image for LCP
                    unoptimized={imagePreview.startsWith('data:')} // allow data URL previews without remote loader
                  />
                  <Button
                    variant='outline'
                    onClick={() => {
                      setSearchImage(null);
                      setImagePreview('');
                      toast.info('Image removed');
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div {...getRootProps()} className='cursor-pointer'>
                  <input {...getInputProps()} />
                  <div className='flex flex-col items-center'>
                    <Upload className='h-12 w-12 text-gray-100 mb-2' />
                    <p className='text-white mb-2'>
                      {isDragActive && !isDragReject
                        ? 'Drop the file here to upload'
                        : 'Drag & drop a car image or click to select'}
                    </p>
                    {isDragReject && (
                      <p className='text-red-500 mb-2'>Invalid image type</p>
                    )}
                    <p className='text-gray-300 text-sm'>
                      Supports: JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {imagePreview && (
              <Button
                type='submit'
                className='w-full mt-2'
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Search with this image'}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
