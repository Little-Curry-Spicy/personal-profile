import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

import FormFeedbackModal, { type FormFeedbackVariant } from '@/components/atoms/FormFeedbackModal';
import { EarthCanvas } from '@/components/canvas';
import SectionWrapper from './SectionWrapper';
import { slideIn } from '@/shared/animations';
import { Header } from '@/shared/ui';
import { useI18n } from '@/context/I18nContext';

const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const web3FormsEndpoint = 'https://api.web3forms.com/submit';

function fillWeb3Template(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? '');
}

const Contact = () => {
  const { catalog } = useI18n();
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialState = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    []
  );
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    variant: FormFeedbackVariant;
    title: string;
    body: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();

    if (!web3FormsAccessKey) {
      setFeedback({
        variant: 'warning',
        title: catalog.contact.feedback.titleConfig,
        body: catalog.contact.alerts.noKey,
      });
      return;
    }

    setLoading(true);

    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '—';
      const vars = {
        name: form.name.trim() || '—',
        email: form.email.trim(),
        message: form.message.trim() || '—',
        pageUrl,
      };
      const { emailNotify } = catalog.contact;
      const mailBody = fillWeb3Template(emailNotify.bodyTemplate, vars);
      const subject = fillWeb3Template(emailNotify.subjectTemplate, vars);

      const response = await fetch(web3FormsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          email: form.email,
          message: mailBody,
          subject,
          from_name: emailNotify.fromName,
          replyto: form.email,
        }),
      });

      const payload = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || payload.success !== true) {
        throw new Error(payload.message ?? `HTTP ${response.status}`);
      }

      setFeedback({
        variant: 'success',
        title: catalog.contact.feedback.titleSuccess,
        body: catalog.contact.alerts.success,
      });
      setForm(initialState);
    } catch (error) {
      console.error(error);
      const hint = error instanceof Error ? error.message : '';
      setFeedback({
        variant: 'error',
        title: catalog.contact.feedback.titleError,
        body: hint ? `${catalog.contact.alerts.fail}\n\n${hint}` : catalog.contact.alerts.fail,
      });
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { key: 'name' as const, ...catalog.contact.form.name },
    { key: 'email' as const, ...catalog.contact.form.email },
    { key: 'message' as const, ...catalog.contact.form.message },
  ];

  return (
    <>
      <FormFeedbackModal
        open={feedback !== null}
        onClose={() => setFeedback(null)}
        variant={feedback?.variant ?? 'success'}
        title={feedback?.title ?? ''}
        dismissLabel={catalog.contact.feedback.dismiss}
      >
        {feedback?.body ?? ''}
      </FormFeedbackModal>

      <div className="mb-12">
        <Header useMotion={false} h2={catalog.contact.h2} />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-stretch gap-10 overflow-hidden xl:mt-2 xl:flex-row xl:items-start">
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="w-full min-w-0 rounded-2xl border border-warm-border bg-warm-elevated p-9 shadow-[0_0_0_1px_var(--color-subtle)] xl:flex-[1.2] xl:px-10"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-7">
            {formFields.map(field => {
              const Component = field.key === 'message' ? 'textarea' : 'input';

              return (
                <label key={field.key} className="flex flex-col">
                  <span className="mb-4 font-medium text-warm-soft">{field.span}</span>
                  <Component
                    type={field.key === 'email' ? 'email' : 'text'}
                    name={field.key}
                    value={form[field.key]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="rounded-xl border border-warm-border bg-warm-page px-6 py-4 font-medium text-warm-fg outline-hidden placeholder:text-warm-wash focus:border-[#3898ec]"
                    {...(field.key === 'message' && { rows: 7 })}
                  />
                </label>
              );
            })}
            <button
              type="submit"
              className="w-fit rounded-xl bg-warm-accent px-8 py-3 font-semibold text-[#faf9f5] shadow-[0_0_0_1px_var(--color-accent)] outline-hidden"
            >
              {loading ? catalog.contact.submitting : catalog.contact.submit}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="flex w-full min-w-0 items-center justify-center xl:flex-1 xl:justify-center"
        >
          {/* 大屏用接近 1:1 的视口画地球，避免右侧栏过窄、过高时画面像被横向压扁 */}
          <div className="relative mx-auto h-[330px] w-full max-w-[640px] md:h-[520px] xl:aspect-square xl:h-auto xl:w-full xl:max-w-[min(100%,720px)]">
            <EarthCanvas />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, 'contact');
