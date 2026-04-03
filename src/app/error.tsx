'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { SeoHead } from '@/components/seo/SeoHead';
import { siteTitle } from '@/lib/constants';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <SeoHead
          title={`错误 — ${siteTitle}`}
          description="页面加载时发生未预期的错误。"
        />
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">出错了</h1>
          <p className="text-gray-600 mb-6">
            我们很抱歉，页面加载过程中发生了意外错误。
          </p>
          <div className="mb-6 text-left bg-gray-100 p-4 rounded-lg text-sm text-gray-700 overflow-x-auto">
            <code className="whitespace-pre-wrap">{error.message}</code>
          </div>
          <Button onClick={() => reset()} variant="primary" size="lg">
            重试加载
          </Button>
          <p className="mt-6 text-sm text-gray-500">
            如果问题持续，请稍后重试或联系管理员。
          </p>
        </div>
      </body>
    </html>
  );
}